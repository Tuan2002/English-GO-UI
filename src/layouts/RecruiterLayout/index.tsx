import React from "react";
import style from "./RecruiterLayout.module.scss";
import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { RecruiterHeader } from "../components/headers";
const cx = classNames.bind(style);
const RecruiterLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <RecruiterHeader toggleCollapsed={toggleCollapsed} />
      </div>
      <div className={cx("body")}>
        <div
          className={cx("sidebar", {
            close: collapsed,
          })}
        >
          <Sidebar collapsed={collapsed} menuType='recruiter' />
        </div>
        <div
          className={cx("content", "scrollbar", {
            close: collapsed,
          })}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RecruiterLayout;
