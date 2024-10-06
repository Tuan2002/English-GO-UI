import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import questionThunks from "./questionThunks";
import { ActionModal } from "@/types/AppType";
import { toast } from "react-toastify";
import { IQuestionData, ISubQuestion, ISubQuestionAnswer } from "@/types/question/QuestionTypes";
import { v4 as uuidv4 } from "uuid";

export interface QuestionState {
  loading: boolean;
  openModalSaveQuestion: boolean;
  selectedQuestion?: IQuestionData;
  actionModal: ActionModal;
  isSubmitting: boolean;
}

const initialState: QuestionState = {
  loading: false,
  openModalSaveQuestion: false,
  selectedQuestion: undefined,
  isSubmitting: false,
  actionModal: "create",
};

export const QuestionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    changeOpenModalSaveQuestion: (state, action) => {
      state.openModalSaveQuestion = action.payload;
    },
    changeActionModal: (state, action) => {
      state.actionModal = action.payload;
    },
    changeIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    changeSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
    initSelectedQuestion: (state, action) => {
      const { categoryId, skillId, levelId, subQuestionNumber } = action.payload;
      const questionId = uuidv4();
      const subQuestions: ISubQuestion[] = [];
      for (let i = 0; i < subQuestionNumber; i++) {
        const subQuestionId = uuidv4();
        const answers: ISubQuestionAnswer[] = [];
        for (let j = 0; j < 4; j++) {
          const answer: ISubQuestionAnswer = {
            id: uuidv4(),
            answerContent: "",
            isCorrect: false,
            subQuestionId,
            order: j,
          };
          answers.push(answer);
        }
        subQuestions.push({
          id: subQuestionId,
          content: "",
          answers: answers,
          correctAnswer: undefined,
          questionId,
          order: i,
        });
      }
      const newQuestion: IQuestionData = {
        id: questionId,
        categoryId,
        skillId,
        levelId,
        questionContent: "",
        questionDescription: "",
        questionNote: "",
        attachedFile: skillId === "listening" ? "abc" : undefined,
        isDeleted: false,
        isActive: true,
        subQuestions,
      };
      state.selectedQuestion = newQuestion;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(questionThunks.getAllQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(questionThunks.getAllQuestions.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
      })
      .addCase(questionThunks.getAllQuestions.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(questionThunks.createNewQuestion.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(questionThunks.createNewQuestion.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveQuestion = false;
        state.actionModal = "create";
        toast.success(action.payload.message);
      })
      .addCase(questionThunks.createNewQuestion.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { message: string }).message);
      });
  },
});

// Action creators are generated for each case reducer function
export const QuestionActions = {
  ...QuestionSlice.actions,
  ...questionThunks,
};

export default QuestionSlice.reducer;
