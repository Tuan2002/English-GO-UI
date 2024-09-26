import ModalCustom from "@/components/Modal";
import CompanyInfomation from "@/features/company-profile/CompanyInfomation";
import { RootState } from "@/stores";
import { CompanyActions } from "@/stores/companyStore/companyReducer";
import { useDispatch, useSelector } from "react-redux";
import style from "./CompanyInfomation.module.scss";
import classNames from "classnames/bind";
import { Button } from "antd";
import { CompanyStatus, ECompanyStatus } from "@/constants/CompanyStatus";
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
  const handleApproveRegister = () => {
    dispatch(CompanyActions.setOpenModalApproveRegisterCompany(true));
  };
  const handleRejectRegister = () => {
    dispatch(CompanyActions.setOpenModalRejectRegisterCompany(true));
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
              <StatusChip type={StatusChipType.PENDING} label='Công ty này đang chờ bạn duyệt' />
            ) : currentCompany?.status === 1 ? (
              <StatusChip type={StatusChipType.APPROVED} label='Bạn đã duyệt đăng kí của công ty này' />
            ) : (
              <StatusChip type={StatusChipType.REJECTED} label='Bạn đã từ chối đăng kí của công ty này' />
            )}
          </div>
          <div className={cx("rightbox")}>
            <Button onClick={onCancel} danger>
              Đóng
            </Button>
            {currentCompany?.status === ECompanyStatus.PENDING && (
              <>
                <Button onClick={handleRejectRegister} type='primary' danger>
                  Từ chối đăng kí
                </Button>
                <Button onClick={handleApproveRegister} type='primary'>
                  Duyệt đăng kí
                </Button>
              </>
            )}
          </div>
        </div>
      }
    >
      <CompanyInfomation company={currentCompany} />
    </ModalCustom>
  );
};
export default CompanyInfomationModal;
