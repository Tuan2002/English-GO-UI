import { BiSolidBellRing, BiSolidMessage } from "react-icons/bi";
import style from "./ContestantHeader.module.scss";
import classNames from "classnames/bind";
import { Avatar, Badge, Col, Popover, Row } from "antd";
import AccountMenu from "../../AccountMenu";
import HeaderNotify from "../../HeaderNotify";
import HeaderMessage from "../../HeaderMessage";
import HeaderMenu from "./HeaderMenu";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import getAccessToken from "@/utils/Functions/getAccessToken";
const cx = classNames.bind(style);

const ContestantHeader = () => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const accessToken = useMemo(() => {
    return getAccessToken();
  }, []);
  return (
    <div className={cx("header-wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header-leftbox")}>
          <Row align='middle'>
            <Col xs={0} sm={24}>
              <div className={cx("logo-box")}>
                <img className={cx("logo")} src='/src/assets/logo-full.png' alt='logo' />
                <div className={cx("arrow")}></div>
              </div>
            </Col>
            <Col xs={24} sm={0}>
              <div className={cx("logo-box")}>
                <div className='d-flex align-items-center'>
                  <img className={cx("logo-less")} src='/src/assets/logo-less.png' alt='logo' />
                </div>
              </div>
            </Col>
          </Row>
          <div className={cx("menu-box")}>
            <HeaderMenu />
          </div>
        </div>
        <div className={cx("header-rightbox")}>
          {accessToken ? (
            <>
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
