import { AppAction } from "@/stores/appStore/appReducer";
import { GeneralAction } from "@/stores/generalStore/generalReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface GetAppVariableProviderProps {
  children: React.ReactNode;
}

const GetAppVariableProvider = ({ children }: GetAppVariableProviderProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(AppAction.getAllGroupRoles());
    dispatch<any>(GeneralAction.getProvinces());
    dispatch<any>(GeneralAction.getMemberCounts());
  }, []);
  return <>{children}</>;
};
export default GetAppVariableProvider;
