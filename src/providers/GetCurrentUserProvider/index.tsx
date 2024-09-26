import { authAction } from "@/stores/authStore/authReducer";
import getAccessToken from "@/utils/Functions/getAccessToken";
import React from "react";
import { useDispatch } from "react-redux";

const GetCurrentUserProvider = ({ children }: { children: JSX.Element }) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) return;
    dispatch<any>(authAction.getCurrentUser());
  }, [accessToken]);
  return children;
};
export default GetCurrentUserProvider;
