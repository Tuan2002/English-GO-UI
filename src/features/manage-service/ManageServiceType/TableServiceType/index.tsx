import ROUTE_PATH from "@/routes/routePath";
import { RootState } from "@/stores";
import classNames from "classnames/bind";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../ManageServiceType.module.scss";
import ServiceTypeItem from "./ServiceTypeItem";
const cx = classNames.bind(style);

const TableServiceType = () => {
  const { listPlanTypes } = useSelector((state: RootState) => state.planStore);
  const navigate = useNavigate();
  const handleGoToServiceTypeDetail = useCallback(
    (serviceType: string) => {
      navigate(ROUTE_PATH.ADMIN_MANAGE_SERVICE.replace(":serviceType", serviceType));
    },
    [navigate]
  );
  return (
    <div className={cx("table-service-type")}>
      {listPlanTypes.map((serviceType) => (
        <ServiceTypeItem onGoToServiceTypeDetail={handleGoToServiceTypeDetail} key={serviceType.id} serviceType={serviceType} />
      ))}
    </div>
  );
};
export default TableServiceType;
