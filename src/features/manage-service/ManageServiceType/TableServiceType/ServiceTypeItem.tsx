import { IPlanType } from "@/types/plan/PlanTypes";
import classNames from "classnames/bind";
import { memo } from "react";
import { BiShow } from "react-icons/bi";
import style from "../ManageServiceType.module.scss";
const cx = classNames.bind(style);
interface ServiceTypeItemProps {
  serviceType: IPlanType;
  onGoToServiceTypeDetail: (typeId: string) => void;
}
const ServiceTypeItem = ({ serviceType, onGoToServiceTypeDetail }: ServiceTypeItemProps) => {
  return (
    <div onClick={() => onGoToServiceTypeDetail(serviceType.id)} className={cx("service-type-item")}>
      <div className={cx("left-box")}>
        <div className={cx("service-type-name")}>{serviceType.displayName}</div>
        <div className={cx("service-type-info")}>
          <div className={cx("service-type-info-item")}>
            <span className={cx("info-title")}>Mã dịch vụ:</span>
            <span className={cx("info-content")}>{serviceType.name}</span>
          </div>
          <div className={cx("service-type-info-item")}>
            <span className={cx("info-title")}>Ngày tạo:</span>
            <span className={cx("info-content")}>{serviceType.createdAt}</span>
          </div>
          <div className={cx("service-type-info-item")}>
            <span className={cx("info-title")}>Số gói dịch vụ:</span>
            <span className={cx("info-content")}>4 gói</span>
          </div>
        </div>
      </div>
      <div className={cx("right-box")}>
        <BiShow />
      </div>
    </div>
  );
};
export default memo(ServiceTypeItem);
