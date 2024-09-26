import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { CompanyActions } from "@/stores/companyStore/companyReducer";
import { useDispatch, useSelector } from "react-redux";
import style from "./RejectRegisterModal.module.scss";
import classNames from "classnames/bind";
import { Avatar, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
const cx = classNames.bind(style);

const RejectRegisterModal = () => {
  const { TextArea } = Input;
  const { openModalRejectRegisterCompany, currentCompany, isSubmitting } = useSelector((state: RootState) => state.companyStore);
  const dispatch = useDispatch();
  const onCancel = () => {
    dispatch(CompanyActions.setOpenModalRejectRegisterCompany(false));
  };
  const [reason, setReason] = useState("");
  const handleConfirmRejectRegister = () => {
    if (!reason) {
      toast.warning("Lý do từ chối không được để trống");
      return;
    }
    dispatch<any>(CompanyActions.rejectRegisterCompany({ id: currentCompany?.id ?? "", reason }));
  };
  return (
    <ModalCustom
      width={500}
      modalTitle={"Từ chối đăng kí công ty"}
      onOK={handleConfirmRejectRegister}
      open={openModalRejectRegisterCompany}
      onCancel={onCancel}
      isLoading={isSubmitting}
    >
      <div className={cx("modal-confirm")}>
        <div className={cx("info")}>
          <Avatar size={80} src={currentCompany?.companyLogo} />
          <span className={cx("company-name")}>{currentCompany?.companyName}</span>
        </div>
        <span className={cx("title")}>Bạn có chắc chắn muốn từ chối đăng kí của công ty này?</span>
        <TextArea
          maxLength={1000}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder='Lý do từ chối *'
        />
      </div>
    </ModalCustom>
  );
};
export default RejectRegisterModal;
