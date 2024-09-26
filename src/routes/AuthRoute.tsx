import getAccessToken from "@/utils/Functions/getAccessToken";
import { Navigate, Outlet } from "react-router-dom";
import ROUTE_PATH from "./routePath";

const AuthRoute = (): JSX.Element => {
  const accessToken = getAccessToken();
  return !accessToken ? <Outlet /> : <Navigate to={ROUTE_PATH.HOME} />;
};
export default AuthRoute;
