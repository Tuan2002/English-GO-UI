import { AppDispatch, RootState } from "@/stores";
import { ExaminerIntroductionActions } from "@/stores/examinerIntroduciton/examinerReducer";
import getAccessToken from "@/utils/Functions/getAccessToken";
import { Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTE_PATH from "./routePath";

const ExaminerProtectRoute = (): JSX.Element => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const dispatch: AppDispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseJwt = (token: any) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };
  const accessToken = getAccessToken();
  React.useEffect(() => {
    if (accessToken) {
      dispatch(ExaminerIntroductionActions.getMyIntroduction()).then((res) => {
        console.log("res", (res.payload as { success: boolean })?.success);
        if (!(res.payload as { success: boolean })?.success) {
          navigate(ROUTE_PATH.EXAMINER_UPDATE_INTRODUCTION);
          return;
        }
      });
    }
  }, [accessToken, dispatch, navigate]);
  if (!accessToken) return <Navigate to={ROUTE_PATH.LOGIN} />;

  const decodedToken = parseJwt(accessToken);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useLayoutEffect(() => {
    if (currentUser && currentUser.groupRole.name !== "examiner") {
      toast.info("Bạn không có quyền truy cập vào trang này!");
      navigate(ROUTE_PATH.HOME);
    }
  }, [decodedToken, currentUser, navigate]);

  return (
    <div>
      {currentUser?.id ? (
        <Outlet />
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spin size='large' spinning={true} />
        </div>
      )}
    </div>
  );
};
export default ExaminerProtectRoute;
