import { Popover } from "antd";
import style from "./CandidateHeader.module.scss";
import classNames from "classnames/bind";
import MenuWrapper from "@/components/MenuWrapper";
import { BiHeart, BiLogoCodepen, BiSearchAlt2, BiWindowAlt } from "react-icons/bi";
import ROUTE_PATH from "@/routes/routePath";
import { Link } from "react-router-dom";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
const cx = classNames.bind(style);
const HeaderMenu = () => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const listMenu = [
    {
      title: "Trang chủ",
      children: null,
      link: ROUTE_PATH.HOME,
    },
    {
      title: "Việc làm",
      children: [
        { title: "Tìm kiếm việc làm", icon: <BiSearchAlt2 /> },
        { title: "Việc làm đã ứng tuyển", icon: <BiWindowAlt /> },
        { title: "Việc làm đã lưu", icon: <BiHeart /> },
        { title: "Việc làm phù hợp", icon: <BiLogoCodepen /> },
      ],
    },
    {
      title: "Hồ sơ và CV",
      children: [
        { title: "CV của tôi", icon: <BiSearchAlt2 /> },
        { title: "Tải CV lên", icon: <BiWindowAlt /> },
        { title: "Hướng dẫn viết CV", icon: <BiLogoCodepen /> },
        { title: "Profile cá nhân", icon: <BiLogoCodepen /> },
        { title: "Mẫu CV", icon: <BiHeart /> },
        { title: "Mẫu CV theo ngành nghề", icon: <BiHeart /> },
      ],
    },
    {
      title: "Công ty",
      children: [
        { title: "Danh sách công ty", icon: <BiSearchAlt2 /> },
        { title: "Top công ty tuyển dụng", icon: <BiWindowAlt /> },
        { title: "Đăng kí nhà tuyển dụng", icon: <BiWindowAlt />, link: ROUTE_PATH.REGISTER_RECRUITMENT },
      ],
    },
    {
      title: "Cẩm nang nghề nghiệp",
      children: [
        { title: "Định hướng nghề nghiệp", icon: <BiSearchAlt2 /> },
        { title: "Bí kíp tìm việc làm", icon: <BiWindowAlt /> },
        { title: "Hành trang nghề nghiệp", icon: <BiWindowAlt /> },
        { title: "Thị trường và xu hướng tuyển dụng", icon: <BiWindowAlt /> },
        { title: "Kiến thức chuyên ngành", icon: <BiWindowAlt /> },
        { title: "Chế độ lương thưởng", icon: <BiWindowAlt /> },
      ],
    },
  ];
  return (
    <div className={cx("header-menu-wrapper")}>
      {listMenu.map((item, index) => {
        return item.children ? (
          <Popover
            trigger={"click"}
            placement='bottomLeft'
            content={
              <MenuWrapper showHeader={false}>
                <div className={cx("menu-children-wrapper")}>
                  {item.children.map((child, index) => {
                    return (
                      <Link to={child.link || ""} className={cx("menu-children")} key={index}>
                        <div className={cx("menu-children-icon")}>{child.icon}</div>
                        <div className={cx("menu-children-title")}>{child.title}</div>
                      </Link>
                    );
                  })}
                </div>
              </MenuWrapper>
            }
            key={index}
          >
            <div className={cx("menu-item")}>{item.title}</div>
          </Popover>
        ) : (
          <Link to={item.link} className={cx("menu-item")} key={index}>
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};
export default HeaderMenu;
