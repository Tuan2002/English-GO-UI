import { RootState } from "@/stores";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import style from "../ManageServiceType.module.scss";
import ServiceTypeItem from "./ServiceTypeItem";
const cx = classNames.bind(style);

const TableServiceType = () => {
  const { listPlanTypes } = useSelector((state: RootState) => state.planStore);
  return (
    <div className={cx("table-service-type")}>
      {listPlanTypes.map((serviceType) => (
        <ServiceTypeItem key={serviceType.id} serviceType={serviceType} />
      ))}
    </div>
  );
};
export default TableServiceType;
