export interface IRegisterRequestData {
  email: string;
  password: string;
  fullName: string;
}

export interface IRegisterResponseData {
  id: string;
  email: string;
  fullName: string;
  role: string;
}
