import { IAppResposeBase } from "@/types/AppType";
import { ILoginRequestData, ILoginResponseData } from "@/types/auth/LoginType";
import { IRegisterRequestData, IRegisterResponseData } from "@/types/auth/RegisterType";
import http from "@/utils/axios/customAxios";

const login = async (loginData: ILoginRequestData): Promise<IAppResposeBase<ILoginResponseData>> => {
  try {
    const response: IAppResposeBase<ILoginResponseData> = await http.post("/api/auth/login", loginData);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
const register = async (registerData: IRegisterRequestData): Promise<IAppResposeBase<IRegisterResponseData>> => {
  try {
    const response: IAppResposeBase<IRegisterResponseData> = await http.post("/api/auth/register", registerData);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const authService = {
  login,
  register,
};
export default authService;
