import getAccessToken from "@/utils/Functions/getAccessToken";
import { Navigate, Outlet } from "react-router-dom";
import ROUTE_PATH from "./routePath";
import { toast } from "react-toastify";

const ProtectRoute = (): JSX.Element => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    toast.info("Vui lòng đăng nhập trước khi đến trang này");
    return <Navigate to={ROUTE_PATH.LOGIN} />;
  }
  return <Outlet />;
};
export default ProtectRoute;
