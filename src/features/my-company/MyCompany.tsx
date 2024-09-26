import CardCustom from "@/components/Card";
import CompanyInfomation from "@/features/company-profile/CompanyInfomation";
import { RootState } from "@/stores";
import { CompanyActions } from "@/stores/companyStore/companyReducer";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ModalUpdateCompany from "./ModalUpdateCompany";

const CardHeader = () => {
  const dispatch = useDispatch();
  const handleOpenModalUpdateCompany = () => {
    dispatch(CompanyActions.setOpenModalUpdateCompany(true));
  };
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <span>Hồ sơ công ty</span>
      <div>
        <Button onClick={handleOpenModalUpdateCompany} type='primary'>
          Cập nhật hồ sơ
        </Button>
      </div>
    </div>
  );
};

const MyCompany = () => {
  const { myCompany } = useSelector((state: RootState) => state.companyStore);
  return (
    <CardCustom cardHeader={<CardHeader />}>
      <CompanyInfomation company={myCompany} />
      <ModalUpdateCompany />
    </CardCustom>
  );
};
export default MyCompany;
