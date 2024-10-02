import { BiSolidChevronLeft } from "react-icons/bi";
import style from "./Button.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const ButtonBackPage = () => {
  return (
    <button className={cx("button-back-page")} onClick={() => window.history.back()}>
      <BiSolidChevronLeft />
    </button>
  );
};
export default ButtonBackPage;
