import React from "react";
import style from "./MainLayout.module.scss";
import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AdminHeader } from "../components/headers";
const cx = classNames.bind(style);
const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <AdminHeader toggleCollapsed={toggleCollapsed} />
      </div>
      <div className={cx("body")}>
        <div
          className={cx("sidebar", {
            close: collapsed,
          })}
        >
          <Sidebar collapsed={collapsed} />
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

export default MainLayout;
