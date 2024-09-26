import ModalCustom from "@/components/Modal";
import CompanyInfomation from "@/features/company-profile/CompanyInfomation";
import { RootState } from "@/stores";
import { CompanyActions } from "@/stores/companyStore/companyReducer";
import { useDispatch, useSelector } from "react-redux";
import style from "./CompanyInfomation.module.scss";
import classNames from "classnames/bind";
import { Button } from "antd";
import StatusChip, { StatusChipType } from "@/components/StatusChip";
const cx = classNames.bind(style);

const CompanyInfomationModal = () => {
  const { openModalShowCompany, currentCompany } = useSelector((state: RootState) => state.companyStore);
  const dispatch = useDispatch();
  const onCancel = () => {
    dispatch(CompanyActions.setOpenModalShowCompany(false));
    dispatch(CompanyActions.setSelectedCompanyId(undefined));
    dispatch(CompanyActions.setCurrentCompany(undefined));
  };
  return (
    <ModalCustom
      width={1200}
      modalTitle={currentCompany?.companyName ?? "Thông tin công ty"}
      scrollBody
      open={openModalShowCompany}
      onCancel={onCancel}
      customFooter={
        <div className={cx("custom-footer")}>
          <div className={cx("leftbox")}>
            {currentCompany?.status === 0 ? (
              <StatusChip
                type={StatusChipType.PENDING}
                label='Quản trị viên đang xem xét thông tin công ty của bạn, hãy chờ để được duyệt nhé'
              />
            ) : currentCompany?.status === 1 ? (
              <StatusChip
                type={StatusChipType.APPROVED}
                label='Công ty của bạn đã được duyệt, hãy đến trang tuyển dụng ngay nào'
              />
            ) : currentCompany?.status === 2 ? (
              <StatusChip
                type={StatusChipType.REJECTED}
                label='Công ty của bạn đã bị từ chối đăng kí, hãy cập nhật lại thông tin'
              />
            ) : (
              <StatusChip
                type={StatusChipType.PENDING}
                label='Nhanh chóng hoàn thành hồ sơ để trở thành nhà tuyển dụng ngay nào'
              />
            )}
          </div>
          <div className={cx("rightbox")}>
            <Button onClick={onCancel} danger>
              Đóng
            </Button>
          </div>
        </div>
      }
    >
      <CompanyInfomation company={currentCompany} />
    </ModalCustom>
  );
};
export default CompanyInfomationModal;
