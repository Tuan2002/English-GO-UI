import GenderStatus from "@/constants/GenderStatus";

export interface ICurrentUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  roleName: string;
  groupRole: {
    name: string;
    displayName: string;
  };
  avatar?: string;
  birthday?: string;
  banner?: string;
  phoneNumber?: string;
  gender?: GenderStatus;
  isUpdated?: boolean;
  isBlocked?: boolean;
}
