import { GradeTargets } from "@/constants/GradeTargets";
import { ERegisterGradeStatus } from "@/constants/RegisterGradeStatus";
import { IExamQuestion, IQuestionResult } from "../exam/ExamTypes";
import { IExaminerIntroduction } from "../examinerIntroduction/ExaminerIntroductionTypes";

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
  title: GradeTargets;
  score: string;
  feedback: string[];
}

export interface IFeedbackDetail {
  score: string;
  overall_feedback: string[];
  corrected_essay: string[];
  feedbackDetail: IFeedbackItem[];
}

export interface IGradeExamWithPersonRequest {
  examId: string;
  skillId: string;
  examinerId: string | null;
  contestantId: string;
}

export interface ICheckRegisterGradingWithPersonRequest {
  examId: string;
  skillId: string;
  contestantId: string;
}
export interface IGradeContestant {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
}

export interface IGradeExaminer {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  phoneNumber: string;
  birthday: string;
  examinerIntroduction: IExaminerIntroduction;
}

export interface IRegisteredGradingExam {
  id: string;
  skillId: string;
  examId: string;
  exam: {
    id: string;
    examCode: string;
    isGradeSpeakingWithPerson: boolean;
    isGradeWritingWithPerson: boolean;
  };
  examinerId: string;
  examiner: IGradeExaminer;
  contestantId: string;
  contestant: IGradeContestant;
  status: ERegisterGradeStatus;
}

export interface IGetGradingFeedbackWithExaminerResponse {
  registeredGrade: IRegisteredGradingExam;
  questions: IGradingFeedbackQuestion[];
}

export interface IGradeQuestionWithPersonRequest {
  levelId: string;
  skillId: string;
  examId: string;
  examinerId: string;
  score: string;
  feedback: string;
  registerGradeExamId: string;
}

export interface ICheckRegisterGradingWithPersonResponse {
  isRegistered: boolean;
  registerGradeExamId: string;
}
