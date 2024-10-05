import ModalCustom from ".";
import style from "./Modal.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
interface IModalConfirmProps {
  open: boolean;
  onOK: () => void;
  onCancel: () => void;
  modalTitle?: string;
  confirmText?: string;
  isLoading?: boolean;
}
const ModalConfirm = ({
  open,
  onOK,
  onCancel,
  modalTitle = "Confirm Modal",
  confirmText = "Are you confirm ... ?",
  isLoading,
}: IModalConfirmProps) => {
  return (
    <ModalCustom
      confirmTitle='Confirm'
      footerCenter
      width={500}
      modalTitle={modalTitle}
      open={open}
      onCancel={onCancel}
      onOK={onOK}
      isLoading={isLoading}
    >
      <div className={cx("modal-confirm")}>
        <div className={cx("warning-icon")}>
          <img className={cx("warning-img")} src='/src/assets/warning.webp' alt='warning' />
        </div>
        <div className={cx("warning-text")}>{confirmText}</div>
      </div>
    </ModalCustom>
  );
};
export default ModalConfirm;
