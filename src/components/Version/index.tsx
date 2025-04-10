import AppVersion from "@/constants/Version";
import classNames from "classnames/bind";
import style from "./Version.module.scss";
const cx = classNames.bind(style);

const Version = () => {
  return <span className={cx("version")}>Version {AppVersion}</span>;
};
export default Version;
