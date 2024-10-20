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
