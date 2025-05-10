import GenderStatus from "@/constants/GenderStatus";

export interface IExaminerIntroduction {
  id: string;
  userId: string;
  description?: string;
  workPlace?: string;
  workAddress?: string;
  introduction?: string;
  avatar?: string;
  banner?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExaminerWithIntroduction {
  id: string;
  email: string;
  fullName: string;
  username: string;
  birthday?: string;
  gender?: GenderStatus;
  phoneNumber?: string;
  groupRoleId: string;
  avatar?: string;
  examinerIntroduction: IExaminerIntroduction;
}
