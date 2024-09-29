import { Outlet } from "react-router-dom";
import style from "./ContestantLayout.module.scss";
import classNames from "classnames/bind";
import ContestantHeader from "../components/headers/ContestantHeader";
const cx = classNames.bind(style);
const ContestantLayout = () => {
  return (
    <div className={cx("candidate-layout")}>
      <div className='header'>
        <ContestantHeader />
      </div>
      <div className={cx("candidate-content", "scrollbar")}>
        <div className={cx("body")}>
          <Outlet />
        </div>
        <div className='footer'></div>
      </div>
    </div>
  );
};
export default ContestantLayout;
