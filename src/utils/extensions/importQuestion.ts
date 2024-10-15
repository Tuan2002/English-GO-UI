import { IQuestionImport, ISubQuestion } from "@/types/question/QuestionTypes";
import PizZip from "pizzip";
import { DOMParser } from "xmldom";
import { v4 as uuidv4 } from "uuid";
function str2xml(str: string) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}
function getParagraphs(content: string) {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files["word/document.xml"].asText());
  const paragraphsXml = xml.getElementsByTagName("w:p");
  const paragraphs = [];
  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
    let fullText = "";
    const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
      const textXml = textsXml[j];
      if (textXml.childNodes) {
        fullText += textXml.childNodes[0].nodeValue;
      }
    }
    paragraphs.push(fullText);
  }
  return paragraphs;
}
// Load the docx file as binary content
const questionRegex = /^(\d*\.|Câu \d+). */; // This regex is used to detect the question e.g. 1. or Câu 1.
const answerRegex = /^(\*[A-Z]|[A-Z]\.). */; // This regex is used to detect the answer e.g. A. or B.
const correctAnswerRegex = /^\*[A-Z].*/; // This regex is used to detect the correct answer e.g. *A. or *B.

const TEXT = {
  START_QUESTION: "*start_question*",
  END_QUESTION: "*end_question*",
  START_DESCRIPTION: "*start_description*",
  END_DESCRIPTION: "*end_description*",
  START_CONTENT: "*start_content*",
  END_CONTENT: "*end_content*",
  START_NOTE: "*start_note*",
  END_NOTE: "*end_note*",
  START_SUB_QUESTION: "*start_sub_question*",
  END_SUB_QUESTION: "*end_sub_question*",
};
const convertArrayToJSON = (inputArray: string[]) => {
  const resultArray: IQuestionImport[] = [];
  let currentQuestion: IQuestionImport | null = null;
  let currentSubQuestion: ISubQuestion | null = null;
  let subQuestions: ISubQuestion[] = [];
  let content = "";
  let ingredients: "description" | "content" | "note" | "sub-question" | string = "description";
  for (let i = 0; i < inputArray.length; i++) {
    const currentItem = inputArray[i].trim();
    if (currentItem === TEXT.START_QUESTION) {
      // this is a new question, create a new question object
      currentQuestion = {
        id: uuidv4(),
        questionContent: "",
        description: "",
        questionNote: "",
        attachedFile: "",
        subQuestions: [],
      };
    }
    if (currentItem === TEXT.END_QUESTION && currentQuestion) {
      // push the current question to the result array
      resultArray.push(currentQuestion);
      currentQuestion = null;
    }
    if (currentQuestion?.id) {
      if (currentItem === TEXT.START_DESCRIPTION) {
        ingredients = "description";
        content = "";
      }
      if (currentItem === TEXT.END_DESCRIPTION) {
        currentQuestion.description = content;
        content = "";
      }
      if (currentItem === TEXT.START_CONTENT) {
        ingredients = "content";
        content = "";
      }
      if (currentItem === TEXT.END_CONTENT) {
        currentQuestion.questionContent = content;
        content = "";
      }
      if (currentItem === TEXT.START_NOTE) {
        ingredients = "note";
        content = "";
      }
      if (currentItem === TEXT.END_NOTE) {
        currentQuestion.questionNote = content;
        content = "";
      }
      if (currentItem === TEXT.START_SUB_QUESTION) {
        ingredients = "sub-question";
        subQuestions = [];
      }
      if (currentItem === TEXT.END_SUB_QUESTION) {
        subQuestions.push(currentSubQuestion!);
        currentQuestion.subQuestions = subQuestions;
        subQuestions = [];
        currentSubQuestion = null;
        ingredients = "question";
      }
      if (!Object.values(TEXT).includes(currentItem)) {
        if (ingredients === "sub-question") {
          // ----------------------------------------
          if (questionRegex.test(currentItem)) {
            // This is a new question
            if (currentSubQuestion !== null) {
              subQuestions.push(currentSubQuestion);
            }
            currentSubQuestion = {
              id: uuidv4(),
              questionId: currentQuestion.id,
              correctAnswer: undefined,
              order: subQuestions.length,
              content: currentItem.replace(questionRegex, "").trim(), // Remove the question number e.g. 1. or Câu 1.
              answers: [],
            };
          }
          if (answerRegex.test(currentItem) || (correctAnswerRegex.test(currentItem) && currentSubQuestion !== null)) {
            const answer = {
              id: uuidv4(),
              subQuestionId: currentSubQuestion!.id,
              order: currentSubQuestion?.answers.length ?? 0,
              answerContent: currentItem.replace(answerRegex, "").trim(), // Remove the answer key e.g. A. or B. or *A.
              isCorrect: correctAnswerRegex.test(currentItem) ? true : false,
            };
            if (answer.isCorrect && currentSubQuestion) {
              currentSubQuestion.correctAnswer = answer.id;
            }
            if (currentSubQuestion) {
              currentSubQuestion.answers.push(answer);
            }
          }
          // ----------------------------------------
        } else if (ingredients === "content") {
          content += `<p>   ${currentItem}</p>`;
        } else {
          content += currentItem + "\n";
        }
      }
    }
  }
  return resultArray;
};
const importQuestion = (content: string): IQuestionImport[] => {
  // const content = fs.readFileSync(filepath, "binary");
  const inputArray = getParagraphs(content);
  const jsonArray = convertArrayToJSON(inputArray);
  return jsonArray;
};
export default importQuestion;
