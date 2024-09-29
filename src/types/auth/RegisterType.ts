export interface IRegisterRequestData {
  username: string;
  password: string;
  fullName: string;
}

export interface IRegisterResponseData {
  id: string;
  username: string;
  fullName: string;
  role: string;
}
