import getAccessToken from "@/utils/Functions/getAccessToken";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import ROUTE_PATH from "./routePath";
import { toast } from "react-toastify";
import React from "react";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const AdminProtectRoute = (): JSX.Element => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseJwt = (token: any) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };
  const accessToken = getAccessToken();
  if (!accessToken) return <Navigate to={ROUTE_PATH.LOGIN} />;

  const decodedToken = parseJwt(accessToken);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useLayoutEffect(() => {
    if (currentUser && currentUser.groupRole.name !== "admin") {
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
export default AdminProtectRoute;
