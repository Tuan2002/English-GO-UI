import { Button, Modal } from "antd";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import style from "./Modal.module.scss";
const cx = classNames.bind(style);
interface ModalCustomProps {
  open: boolean;
  onOK?: () => void;
  onCancel: () => void;
  modalTitle?: string;
  confirmTitle?: string;
  cancelTitle?: string;
  showHeader?: boolean;
  customHeader?: React.ReactNode;
  showFooter?: boolean;
  customFooter?: React.ReactNode;
  footerCenter?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
  width?: number | string;
  scrollBody?: boolean;
  isLoading?: boolean;
  maskClosable?: boolean;
  isFullScreen?: boolean;
  disableActions?: boolean;
}

const ModalCustom = ({
  open,
  onCancel,
  onOK,
  modalTitle = "Truyền modalTitle vào nè",
  confirmTitle = "OK",
  cancelTitle = "Cancel",
  children,
  showHeader = true,
  customHeader = null,
  showFooter = true,
  customFooter = null,
  showCloseButton = true,
  footerCenter = false,
  scrollBody = false,
  width = 1200,
  isLoading = false,
  maskClosable = true,
  isFullScreen = false,
  disableActions = false,
}: ModalCustomProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        scrollToTop();
      }, 0);
    }
  }, [open]);
  return (
    <Modal
      maskClosable={maskClosable}
      centered
      width={isFullScreen ? "100vw" : width}
      open={open}
      closeIcon={showCloseButton}
      onOk={onOK}
      onCancel={onCancel}
      footer={false}
      // height={isFullScreen ? "100vh" : "auto"}
    >
      {showHeader ? (
        customHeader ? (
          customHeader
        ) : (
          <div className={cx("modal-header")}>
            <span className={cx("title")}>{modalTitle}</span>
          </div>
        )
      ) : null}
      <div
        className={cx("modal-body", "scrollbar", {
          "scroll-body": scrollBody,
        })}
      >
        <div ref={scrollRef}></div>
        {children}
      </div>
      {showFooter ? (
        customFooter ? (
          customFooter
        ) : (
          <div className={cx("modal-footer", { footerCenter })}>
            <Button disabled={disableActions} type='primary' danger onClick={onCancel}>
              {cancelTitle}
            </Button>
            <Button disabled={disableActions} type='primary' onClick={onOK} loading={isLoading}>
              {confirmTitle}
            </Button>
          </div>
        )
      ) : null}
    </Modal>
  );
};
export default ModalCustom;
