import GenderStatus from "@/constants/GenderStatus";
import { IGetDataResponse } from "../AppType";

export interface IUserData {
  id: string;
  email: string;
  fullName: string;
  groupRoleId: string;
  groupRole: {
    name: string;
    displayName: string;
  };
  avatar?: string;
  isActive: boolean;
  isUpdated: boolean;
  isBlocked: boolean;
}

export interface IGetUserDataResponse extends IGetDataResponse {
  users: IUserData[];
}

export interface ICreateUserPayload {
  email: string;
  fullName: string;
  groupRoleId: string;
  avatar?: string;
  password: string;
}

export interface IUpdateProfilePayload {
  id: string;
  avatar?: string;
  banner?: string;
  fullName: string;
  birthday: string;
  gender: GenderStatus;
  phoneNumber?: string;
}
