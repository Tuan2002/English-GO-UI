export interface IExamTrackingRequest {
  examSessionId: string;
  languageId: string;
  locationId: string;
  studentCode: string;
  signature: string;
}
export interface IExamSession {
  value: string;
  text: string;
}

export interface IGetExamSessionResponse {
  examSessions: IExamSession[];
  signature: string;
}

export interface ICheckPoint {
  index: string;
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  listeningScore: string;
  readingScore: string;
  writingScore: string;
  speakingScore: string;
  totalScore: string;
  level: string;
}
