import React from "react";
import style from "./MenuWrapper.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface IMenuWrapperProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
}

const MenuWrapper = ({ children, showHeader = true, headerTitle = "This is header" }: IMenuWrapperProps) => {
  return (
    <div className={cx("menu-wrapper")}>
      {showHeader && <div className={cx("header")}>{headerTitle}</div>}
      <div className={cx("content")}>{children}</div>
    </div>
  );
};
export default MenuWrapper;
