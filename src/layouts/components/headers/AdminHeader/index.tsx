import { BsTextIndentLeft } from "react-icons/bs";
import { BiSolidBellRing, BiSolidMessage } from "react-icons/bi";
import style from "./AdminHeader.module.scss";
import classNames from "classnames/bind";
import { Avatar, Badge, Dropdown, MenuProps, Popover } from "antd";
import HeaderNotify from "../../HeaderNotify";
import HeaderMessage from "../../HeaderMessage";
import AccountMenu from "../../AccountMenu";
const cx = classNames.bind(style);

interface IAdminHeaderProps {
  toggleCollapsed: () => void;
}

const AdminHeader = ({ toggleCollapsed }: IAdminHeaderProps) => {
  return (
    <div className={cx("header-wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header-leftbox")}>
          <span className={cx("button")} onClick={toggleCollapsed}>
            <BsTextIndentLeft />
          </span>
          <img className={cx("logo")} src='/src/assets/logo-full.png' alt='logo' />
          <div className={cx("arrow")}></div>
        </div>
        <div className={cx("header-rightbox")}>
          <Popover trigger={"click"} placement='bottom' content={<HeaderNotify />}>
            <Badge count={5} size='small' offset={[-5, 5]}>
              <span className={cx("header-icon")}>
                <BiSolidBellRing className={cx("icon")} />
              </span>
            </Badge>
          </Popover>
          <Popover trigger={"click"} placement='bottom' content={<HeaderMessage />}>
            <Badge count={5} size='small' offset={[-5, 5]}>
              <span className={cx("header-icon")}>
                <BiSolidMessage className={cx("icon")} />
              </span>
            </Badge>
          </Popover>

          <Popover trigger={"click"} placement='bottomRight' content={<AccountMenu />}>
            <Avatar className='cursor-pointer' size={"large"}>
              U
            </Avatar>
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
