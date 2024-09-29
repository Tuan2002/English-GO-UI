import { authAction } from "@/stores/authStore/authReducer";
import getAccessToken from "@/utils/Functions/getAccessToken";
import React from "react";
import { useDispatch } from "react-redux";

const GetCurrentUserProvider = ({ children }: { children: JSX.Element }) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!accessToken) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(authAction.getCurrentUser());
  }, [accessToken, dispatch]);
  return children;
};
export default GetCurrentUserProvider;
