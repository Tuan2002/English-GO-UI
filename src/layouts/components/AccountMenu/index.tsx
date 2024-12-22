import { Avatar, Button } from "antd";
import { BiEdit } from "react-icons/bi";
import style from "./AccountMenu.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { authAction } from "@/stores/authStore/authReducer";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
import { toast } from "react-toastify";
import { useMemo } from "react";
import getAccessToken from "@/utils/Functions/getAccessToken";
const cx = classNames.bind(style);

const AccountMenu = () => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  console.log(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authAction.logout());
    localStorage.removeItem("accessToken");
    navigate(ROUTE_PATH.LOGIN);
    toast.success("Đã đăng xuất khỏi hệ thống");
  };
  const handleGoToExamHistory = () => {
    navigate(ROUTE_PATH.EXAM_HISTORY_LIST);
  };
  const handleGoToMyProfile = () => {
    navigate(ROUTE_PATH.ACCOUNT_PROFILE);
  };
  const handleGoToChangePassword = () => {
    navigate(ROUTE_PATH.ACCOUNT_CHANGE_PASSWORD);
  };
  const handleGoToAdminPage = () => {
    navigate(ROUTE_PATH.ADMIN_DASHBOARD);
  };
  const accessToken = useMemo(() => {
    return getAccessToken();
  }, []);
  return (
    <div className={cx("account-menu-wrapper", "scrollbar")}>
      {accessToken ? (
        <>
          <div className={cx("user-info")}>
            <div className={cx("avatar")}>
              <Avatar size='large' src={currentUser?.avatar ? currentUser.avatar : ""}>
                U
              </Avatar>
            </div>
            <div className={cx("info")}>
              <div className={cx("name")}>{currentUser?.fullName}</div>
              <div className={cx("email")}>{currentUser?.email}</div>
            </div>
          </div>
        </>
      ) : (
        <div className='full-width'>
          <Button className='full-width' size='large' type='primary' onClick={() => navigate(ROUTE_PATH.LOGIN)}>
            Đăng nhập
          </Button>
        </div>
      )}
      {accessToken && (
        <div className={cx("menu-list")}>
          {currentUser?.groupRole.name === "admin" && (
            <div onClick={handleGoToAdminPage} className={cx("menu-item")}>
              <span className={cx("icon")}>
                <BiEdit />
              </span>
              <span className={cx("name")}>Trang quản trị</span>
            </div>
          )}
          <div onClick={handleGoToMyProfile} className={cx("menu-item")}>
            <span className={cx("icon")}>
              <BiEdit />
            </span>
            <span className={cx("name")}>Cài đặt thông tin cá nhân</span>
          </div>
          <div onClick={handleGoToExamHistory} className={cx("menu-item")}>
            <span className={cx("icon")}>
              <BiEdit />
            </span>
            <span className={cx("name")}>Lịch sử luyện thi</span>
          </div>
          <div onClick={handleGoToChangePassword} className={cx("menu-item")}>
            <span className={cx("icon")}>
              <BiEdit />
            </span>
            <span className={cx("name")}>Đổi mật khẩu</span>
          </div>
          <div className={cx("menu-item")} onClick={() => handleLogout()}>
            <span className={cx("icon")}>
              <BiEdit />
            </span>
            <span className={cx("name")}>Đăng xuất</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default AccountMenu;
