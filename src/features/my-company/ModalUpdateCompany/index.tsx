import ModalCustom from "@/components/Modal";
import CompanyInfomationForm from "@/features/company-profile/CompanyInfomationForm";
import { RootState } from "@/stores";
import { CompanyActions } from "@/stores/companyStore/companyReducer";
import { useDispatch, useSelector } from "react-redux";

const ModalUpdateCompany = () => {
  const dispatch = useDispatch();
  const { openModalUpdateCompany, myCompany } = useSelector((state: RootState) => state.companyStore);
  const handleCancel = () => {
    dispatch(CompanyActions.setOpenModalUpdateCompany(false));
  };
  const onConfirmUpdate = async () => {
    console.log("onConfirmUpdate");
  };
  return (
    <ModalCustom
      onOK={onConfirmUpdate}
      modalTitle='Cập nhật thông tin công ty'
      scrollBody
      open={openModalUpdateCompany}
      onCancel={handleCancel}
    >
      <CompanyInfomationForm company={myCompany} />
    </ModalCustom>
  );
};
export default ModalUpdateCompany;
