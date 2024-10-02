export interface ILevel {
  id: string;
  name: string;
  skillId: string;
  subQuestionNumber: number;
  displayName: string;
  description?: string;
  image?: string;
}

export interface ILevelDataUpdate {
  levelId: string;
  image?: string;
  description?: string;
  subQuestionNumber: number;
}
