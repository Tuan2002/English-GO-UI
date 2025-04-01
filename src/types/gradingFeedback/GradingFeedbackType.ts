import { IExamQuestion, IQuestionResult } from "../exam/ExamTypes";

export interface IGradingFeedback {
  id: string;
  examQuestionId: string;
  score: string;
  type: string;
  feedback: string;
}
export interface IGradingFeedbackQuestion {
  examId: string;
  questionId: string;
  id: string;
  question: IExamQuestion;
  results: IQuestionResult[];
  gradeFeedback: IGradingFeedback;
}

interface IFeedbackItem {
  score: string;
  feedback: string[];
}

export interface IFeedbackDetail {
  score: string;
  overall_feedback: string[];
  grammar: IFeedbackItem;
  coherence: IFeedbackItem;
  vocabulary: IFeedbackItem;
  sentence_complexity: IFeedbackItem;
  task_achievement: IFeedbackItem;
  corrected_essay: string;
}
