import { IQuestion, ISubQuestion } from "../question/QuestionTypes";

export interface IExam {
  id: string;
  userId: string;
  examCode: string;
  startTime: string;
  endTime: string;
  isDeleted: boolean;
  isActive: boolean;
  isDone: boolean;
}

export interface IExamSkillStatus {
  id: string;
  examId: string;
  skillId: string;
  skill: {
    name: string;
    expiredTime: string;
  };
  startTime: string;
  endTime: string;
  order: number;
  score?: number;
  totalQuestion?: number;
  status: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED";
}

export interface IExamSubQuestion extends ISubQuestion {
  selectedAnswerId?: string;
}

export interface IExamQuestion extends IQuestion {
  subQuestions?: IExamSubQuestion[];
  questionData?: string;
}

export interface IContinueExamResponse {
  exam: IExam;
  questions: Array<{
    examId: string;
    questionId: string;
    id: string;
    question: IExamQuestion;
  }>;
  skill: IExamSkillStatus;
}

export interface IQuestionResult {
  id: string;
  question: string;
  answer: string;
  feedback: string;
  point?: number;
  isRated: boolean;
}

export interface IResultOfQuestion {
  questionId: string;
  skillId: string;
  levelId: string;
  results: IQuestionResult[];
}

export interface IQuestionResultResponse {
  exam: IExam;
  questions: Array<{
    examId: string;
    questionId: string;
    id: string;
    question: IExamQuestion;
    results: IQuestionResult[];
  }>;
  skill: IExamSkillStatus;
}

export interface ISubmitSkillRequest {
  skillId: string;
  questions: IExamQuestion[];
}
export interface ISpeakingQuestionSubmit {
  questionId: string;
  answer: string;
  skillId: string;
  levelId: string;
}

export interface ITargetQuestionOfSkill {
  index: number;
  skillId: string;
  levelId: string;
  questionId: string;
  isDone?: boolean;
}

export interface IListeningSkillAudioStatus {
  questionId: string;
  audioSrc: string;
  isPlaying?: boolean;
  progress?: number;
  currentTime: number;
}

export interface IExamScore {
  id: string;
  examCode: string;
  startTime: string;
  endTime: string;
  examSkillStatuses: IExamSkillStatus[];
}

export interface ICurrentExamResponse {
  exam: IExam;
  currentSkill: IExamSkillStatus;
}

export interface IUserExam extends IExamScore {
  user: {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    username: string;
  };
}

export interface IGetAllExamDTO {
  page?: number;
  limit?: number;
  search?: string;
  userIds?: string[];
}
