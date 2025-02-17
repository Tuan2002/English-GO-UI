export interface ISendIvaluateDTO {
  starNumber: number;
  description: string;
}
export interface IEvaluate {
  id: string;
  starNumber: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  isShow: boolean;
  user: {
    id: string;
    fullName: string;
    username: string;
    email: string;
    avatar: string;
  };
}

export interface IGetAllEvaluateDTO {
  page?: number;
  limit?: number;
  isShow?: boolean;
}
