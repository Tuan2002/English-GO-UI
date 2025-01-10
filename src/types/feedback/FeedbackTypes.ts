export interface ISendFeedbackData {
  fullName: string;
  email: string;
  phoneNumber: string;
  feedback: string;
}
export interface IFeedback {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  feedback: string;
  createdAt: string;
}

export interface IGetAllFeedbackDTO {
  page?: number;
  limit?: number;
  search?: string;
}
