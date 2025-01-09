import { BiX } from "react-icons/bi";
import style from "./ContestantHeader.module.scss";
import classNames from "classnames/bind";
import { Menu } from "antd";
import Version from "@/components/Version";
import contestantMenu from "../../Menu/ContestantMenu";
const cx = classNames.bind(style);
interface IMobileMenuProps {
  onCloseMenu: () => void;
}
const MobileMenu = ({ onCloseMenu }: IMobileMenuProps) => {
  return (
    <div className={cx("mobile-menu")}>
      <div className={cx("mobile-menu-header")}>
        <div className={cx("logo-box")}>
          <img className={cx("logo", "full-width")} src='/logo-full.png' alt='logo' />
          <div className={cx("arrow")}></div>
        </div>
        <div className={cx("close-icon")} onClick={onCloseMenu}>
          <BiX />
        </div>
      </div>
      <div className={cx("menu", "scrollbar")}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          mode='inline'
          theme='light'
          // inlineCollapsed={collapsed}
          items={contestantMenu}
        />
        <Version />
      </div>
    </div>
  );
};
export default MobileMenu;
