import style from "./StatusChip.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

export enum StatusChipType {
  APPROVED = "approved",
  REJECTED = "rejected",
  PENDING = "pending",
  DEFAULT = "default",
}

interface IStatusChip {
  label: string;
  type: StatusChipType;
}
const StatusChip = ({ label, type }: IStatusChip) => {
  return <span className={cx("chip", type)}>{label}</span>;
};
export default StatusChip;
