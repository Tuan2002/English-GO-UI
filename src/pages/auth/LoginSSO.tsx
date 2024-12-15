import ROUTE_PATH from "@/routes/routePath";
import { AppDispatch } from "@/stores";
import { authAction } from "@/stores/authStore/authReducer";
import { IAppResposeBase } from "@/types/AppType";
import { IUserData } from "@/types/user/UserType";
import http from "@/utils/axios/customAxios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginSSO = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const decodeFragment = (hash: string) => {
    const params = new URLSearchParams(hash);
    const id_token = params.get("id_token");
    const access_token = params.get("access_token");
    const token_type = params.get("token_type");
    const expires_in = params.get("expires_in");
    const state = params.get("state");
    const session_state = params.get("session_state");
    return { id_token, access_token, token_type, expires_in, state, session_state };
  };

  useEffect(() => {
    if (!hash) return;
    const { access_token } = decodeFragment(hash);
    if (!access_token) return;
    // set access token to local storage
    localStorage.setItem("accessToken", access_token);
    // get user info
    const checkUserExist = async () => {
      const user = await http.get("/api/auth/check-user");
      if (user.data === false) {
        const registerUser: IAppResposeBase<IUserData> = await http.post("/api/auth/register-user-sso");
        if (registerUser.success === true) {
          navigate(ROUTE_PATH.HOME);
          dispatch(authAction.getCurrentUser());
        } else {
          toast.error(registerUser.message);
          navigate(ROUTE_PATH.LOGIN);
        }
      } else {
        dispatch(authAction.getCurrentUser());
        navigate(ROUTE_PATH.HOME);
      }
    };
    checkUserExist();
  }, [hash]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Đang xác thực</h1>
    </div>
  );
};
export default LoginSSO;
