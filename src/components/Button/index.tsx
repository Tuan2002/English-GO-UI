import { Button } from "antd";
import style from "./Button.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface TableRowButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  type?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
}

const TableRowButton = ({ onClick, icon, type = "primary" }: TableRowButtonProps) => {
  return <Button onClick={onClick} type='primary' icon={icon} size='small' className={cx("button", type)} />;
};
export default TableRowButton;
