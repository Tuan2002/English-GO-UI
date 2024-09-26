import getAccessToken from "@/utils/Functions/getAccessToken";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import ROUTE_PATH from "./routePath";
import { toast } from "react-toastify";
import React from "react";
import { useDispatch } from "react-redux";
import { CompanyActions } from "@/stores/companyStore/companyReducer";

const RecruiterProtectRoute = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  React.useEffect(() => {
    if (decodedToken.roleName === "candidate" || !decodedToken.isRecruiter) {
      toast.info("Bạn không phải là nhà tuyển dụng, không thể truy cập vào trang này!");
      navigate(ROUTE_PATH.HOME);
    }
    dispatch<any>(CompanyActions.getMyCompany());
  }, [decodedToken]);

  return <Outlet />;
};
export default RecruiterProtectRoute;
