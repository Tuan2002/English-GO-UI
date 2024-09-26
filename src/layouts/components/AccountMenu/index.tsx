import { Avatar } from "antd";
import { BiEdit } from "react-icons/bi";
import style from "./AccountMenu.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { authAction } from "@/stores/authStore/authReducer";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
import { toast } from "react-toastify";
const cx = classNames.bind(style);

const AccountMenu = () => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authAction.logout());
    navigate(ROUTE_PATH.LOGIN);
    toast.success("Đã đăng xuất khỏi hệ thống");
  };
  return (
    <div className={cx("account-menu-wrapper", "scrollbar")}>
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
      <div className={cx("menu-list")}>
        <div className={cx("menu-item")}>
          <span className={cx("icon")}>
            <BiEdit />
          </span>
          <span className={cx("name")}>Cài đặt thông tin cá nhân</span>
        </div>
        <div className={cx("menu-item")}>
          <span className={cx("icon")}>
            <BiEdit />
          </span>
          <span className={cx("name")}>Nâng cấp tài khoản</span>
        </div>
        <div className={cx("menu-item")}>
          <span className={cx("icon")}>
            <BiEdit />
          </span>
          <span className={cx("name")}>Nhà tuyển dụng xem hồ sơ</span>
        </div>
        <div className={cx("menu-item")}>
          <span className={cx("icon")}>
            <BiEdit />
          </span>
          <span className={cx("name")}>Cài đặt gợi ý việc làm</span>
        </div>
        <div className={cx("menu-item")}>
          <span className={cx("icon")}>
            <BiEdit />
          </span>
          <span className={cx("name")}>Cài đặt thông báo việc làm</span>
        </div>
        <div className={cx("menu-item")}>
          <span className={cx("icon")}>
            <BiEdit />
          </span>
          <span className={cx("name")}>Cài đặt nhận email tuyển dụng</span>
        </div>
        <div className={cx("menu-item")}>
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
    </div>
  );
};
export default AccountMenu;
