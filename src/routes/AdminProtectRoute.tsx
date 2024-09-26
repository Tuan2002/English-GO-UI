import getAccessToken from "@/utils/Functions/getAccessToken";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import ROUTE_PATH from "./routePath";
import { toast } from "react-toastify";
import React from "react";

const AdminProtectRoute = (): JSX.Element => {
  const navigate = useNavigate();
  const parseJwt = (token: any) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  const accessToken = getAccessToken();
  if (!accessToken) return <Navigate to={ROUTE_PATH.LOGIN} />;

  const decodedToken = parseJwt(accessToken);
  console.log(decodedToken);
  React.useEffect(() => {
    if (decodedToken.roleName !== "admin") {
      toast.info("Bạn không có quyền truy cập vào trang này!");
      navigate(ROUTE_PATH.HOME);
    }
  }, [decodedToken]);
  return <Outlet />;
};
export default AdminProtectRoute;
