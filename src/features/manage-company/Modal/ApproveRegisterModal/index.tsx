import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { CompanyActions } from "@/stores/companyStore/companyReducer";
import { useDispatch, useSelector } from "react-redux";
import style from "./ApproveRegisterModal.module.scss";
import classNames from "classnames/bind";
import { Avatar } from "antd";
const cx = classNames.bind(style);

const ApproveRegisterModal = () => {
  const { openModalApproveRegisterCompany, currentCompany, isSubmitting } = useSelector((state: RootState) => state.companyStore);
  const dispatch = useDispatch();
  const onCancel = () => {
    dispatch(CompanyActions.setOpenModalApproveRegisterCompany(false));
  };
  const handleConfirmApproveRegister = () => {
    dispatch<any>(CompanyActions.approveRegisterCompany(currentCompany?.id ?? ""));
  };
  return (
    <ModalCustom
      width={500}
      modalTitle={"Duyệt đăng kí công ty"}
      onOK={handleConfirmApproveRegister}
      open={openModalApproveRegisterCompany}
      onCancel={onCancel}
      isLoading={isSubmitting}
    >
      <div className={cx("modal-confirm")}>
        <div className={cx("info")}>
          <Avatar size={80} src={currentCompany?.companyLogo} />
          <span className={cx("company-name")}>{currentCompany?.companyName}</span>
        </div>
        <span className={cx("title")}>Bạn có chắc chắn muốn duyệt đăng kí của công ty này?</span>
      </div>
    </ModalCustom>
  );
};
export default ApproveRegisterModal;
