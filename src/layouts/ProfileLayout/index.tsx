import { NavLink, Outlet } from "react-router-dom";
import style from "./ProfileLayout.module.scss";
import classNames from "classnames/bind";
import Container from "@/components/Container";
import { Col, Row, Skeleton } from "antd";
import Uploadimage from "@/components/UploadImage";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { BiEnvelope, BiHistory, BiKey, BiMicrophone, BiSortUp, BiUserCircle } from "react-icons/bi";
import ROUTE_PATH from "@/routes/routePath";
import { useMemo } from "react";
const cx = classNames.bind(style);

interface ProfileLayoutProps {
  pageName?: "exam" | "profile";
}
interface IMenuItem {
  icon: React.ReactNode;
  text: string;
  path: string;
}

const ProfileLayout = ({ pageName = "exam" }: ProfileLayoutProps) => {
  const listMenu: IMenuItem[] = useMemo(() => {
    switch (pageName) {
      case "exam":
        return [
          {
            icon: <BiHistory />,
            text: "Lịch sử luyện thi",
            path: ROUTE_PATH.EXAM_HISTORY_LIST,
          },
          {
            icon: <BiEnvelope />,
            text: "Danh sách bài thi viết",
            path: ROUTE_PATH.EXAM_HISTORY_WRITING,
          },
          {
            icon: <BiMicrophone />,
            text: "Danh sách bài thi nói",
            path: ROUTE_PATH.EXAM_HISTORY_SPEAKING,
          },
        ];
      case "profile":
        return [
          {
            icon: <BiUserCircle />,
            text: "Thông tin tài khoản",
            path: ROUTE_PATH.ACCOUNT_PROFILE,
          },
          {
            icon: <BiKey />,
            text: "Đổi mật khẩu",
            path: ROUTE_PATH.ACCOUNT_CHANGE_PASSWORD,
          },
          {
            icon: <BiSortUp />,
            text: "Nâng cấp tài khoản",
            path: ROUTE_PATH.ACCOUNT_UPGRADE,
          },
        ];
      default:
        return [];
    }
  }, [pageName]);
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  return (
    <Container>
      <div className={cx("profile-layout-wrapper")}>
        <Row gutter={[20, 20]} className='full-height'>
          <Col span={6} xs={24} md={8} lg={6} className='full-height'>
            <div className={cx("left-box")}>
              {currentUser?.id ? (
                <div className={cx("user-box")}>
                  <div className={cx("user-avatar")}>
                    <Uploadimage defaultImage={currentUser?.avatar} type='avatar' size={100} />
                  </div>
                  <div className={cx("user-info")}>
                    <div className={cx("username")}>{currentUser?.username}</div>
                    <div className={cx("fullname")}>{currentUser?.fullName}</div>
                  </div>
                </div>
              ) : (
                <div className='text-center'>
                  <Skeleton.Avatar active size={100} shape='circle' style={{ marginBottom: "10px" }} />
                  <Skeleton.Input active block size='large' style={{ height: "25px", margin: "5px 0" }} />
                  <Skeleton.Input active block size='large' style={{ height: "30px", margin: "5px 0" }} />
                </div>
              )}
              <div className={cx("menu-box", "menu-navlink")}>
                {listMenu?.length > 0 &&
                  listMenu.map((item, index) => (
                    <NavLink key={index} to={item.path} className={cx("menu-item")}>
                      <div className={cx("menu-icon")}>{item.icon}</div>
                      <div className={cx("menu-text")}>{item.text}</div>
                    </NavLink>
                  ))}
              </div>
            </div>
          </Col>
          <Col span={18} xs={24} md={16} lg={18}>
            <div className={cx("right-box")}>
              <Outlet />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default ProfileLayout;
