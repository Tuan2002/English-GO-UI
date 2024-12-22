import { RootState } from "@/stores";
import { Avatar, Badge, Popover } from "antd";
import classNames from "classnames/bind";
import { BiSolidBellRing, BiSolidMessage } from "react-icons/bi";
import { BsTextIndentLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import AccountMenu from "../../AccountMenu";
import HeaderMessage from "../../HeaderMessage";
import HeaderNotify from "../../HeaderNotify";
import style from "./AdminHeader.module.scss";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

interface IAdminHeaderProps {
  toggleCollapsed: () => void;
}

const AdminHeader = ({ toggleCollapsed }: IAdminHeaderProps) => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const navigate = useNavigate();
  const handleGoToHomePage = () => {
    navigate("/");
  };
  return (
    <div className={cx("header-wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header-leftbox")}>
          <span className={cx("button")} onClick={toggleCollapsed}>
            <BsTextIndentLeft />
          </span>
          <img onClick={handleGoToHomePage} className={cx("logo")} src='/logo-full.png' alt='logo' />
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
            <Avatar src={currentUser?.avatar ? currentUser.avatar : ""} className='cursor-pointer' size={"large"}>
              U
            </Avatar>
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
