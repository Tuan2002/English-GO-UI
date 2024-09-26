import { Outlet } from "react-router-dom";
import CandidateHeader from "../components/headers/CandidateHeader";
import style from "./CandidateLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const CandidateLayout = () => {
  return (
    <div className={cx("candidate-layout")}>
      <div className='header'>
        <CandidateHeader />
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
export default CandidateLayout;
