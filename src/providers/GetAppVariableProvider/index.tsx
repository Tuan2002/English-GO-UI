import { AppAction } from "@/stores/appStore/appReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface GetAppVariableProviderProps {
  children: React.ReactNode;
}

const GetAppVariableProvider = ({ children }: GetAppVariableProviderProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(AppAction.getAllGroupRoles());
  }, [dispatch]);
  return <>{children}</>;
};
export default GetAppVariableProvider;
