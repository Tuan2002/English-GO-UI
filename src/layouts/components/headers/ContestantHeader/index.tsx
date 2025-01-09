import { BiMenu, BiSolidBellRing, BiSolidMessage } from "react-icons/bi";
import style from "./ContestantHeader.module.scss";
import classNames from "classnames/bind";
import { Avatar, Badge, Drawer, Popover } from "antd";
import AccountMenu from "../../AccountMenu";
import HeaderNotify from "../../HeaderNotify";
import HeaderMessage from "../../HeaderMessage";
import HeaderMenu from "./HeaderMenu";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import getAccessToken from "@/utils/Functions/getAccessToken";
import MobileMenu from "./MobileMenu";
const cx = classNames.bind(style);

const ContestantHeader = () => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const [openDrawer, setOpenDrawer] = useState(false);
  const accessToken = useMemo(() => {
    return getAccessToken();
  }, []);
  const changeOpenDrawer = (isOpen: boolean) => {
    setOpenDrawer(isOpen);
  };
  return (
    <div className={cx("header-wrapper")}>
      <div className={cx("header")}>
        <div className={cx("d-none", "md-show")}>
          <span className={cx("header-icon")} onClick={() => changeOpenDrawer(true)}>
            <BiMenu className={cx("icon")} />
          </span>
          <Drawer
            className={cx("drawer-custom", "drawer")}
            placement={"left"}
            closable={false}
            onClose={() => changeOpenDrawer(false)}
            open={openDrawer}
            key={"left"}
          >
            <MobileMenu onCloseMenu={() => changeOpenDrawer(false)} />
          </Drawer>
        </div>
        <div className={cx("header-leftbox")}>
          <div className={cx("logo-box")}>
            <img className={cx("logo")} src='/logo-full.png' alt='logo' />
            <div className={cx("arrow")}></div>
          </div>
          <div className={cx("menu-box")}>
            <HeaderMenu />
          </div>
        </div>
        <div className={cx("header-rightbox")}>
          {accessToken ? (
            <>
              <Popover className={cx("md-hidden")} trigger={"click"} placement='bottom' content={<HeaderNotify />}>
                <Badge count={5} size='small' offset={[-5, 5]}>
                  <span className={cx("header-icon")}>
                    <BiSolidBellRing className={cx("icon")} />
                  </span>
                </Badge>
              </Popover>
              <Popover className={cx("md-hidden")} trigger={"click"} placement='bottom' content={<HeaderMessage />}>
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
            </>
          ) : (
            <Popover trigger={"click"} placement='bottomRight' content={<AccountMenu />}>
              <Avatar className='cursor-pointer' size={"large"}>
                U
              </Avatar>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContestantHeader;
