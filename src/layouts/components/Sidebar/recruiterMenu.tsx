import ROUTE_PATH from "@/routes/routePath";
import { AppstoreOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const recruiterMenu: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link to={ROUTE_PATH.RECRUITER_DASHBOARD}>Bảng tin</Link>,
  },
  {
    key: "3",
    icon: <DesktopOutlined />,
    label: <Link to={ROUTE_PATH.RECRUITER_COMPANY}>Hồ sơ công ty</Link>,
  },
  {
    key: "4",
    icon: <AppstoreOutlined />,
    label: <Link to={ROUTE_PATH.RECRUITER_RECRUITMENT_NEW}>Tin tuyển dụng</Link>,
  },
  {
    key: "5",
    label: "Quản lý ứng viên",
    icon: <MailOutlined />,
  },
  {
    key: "6",
    label: "Tìm kiếm hồ sơ",
    icon: <AppstoreOutlined />,
  },
  {
    key: "7",
    label: "Lịch sử hoạt động",
    icon: <AppstoreOutlined />,
  },
  {
    key: "8",
    label: "Thông báo từ hệ thống",
    icon: <AppstoreOutlined />,
  },
  {
    key: "9",
    label: "Hộp thư hỗ trợ",
    icon: <AppstoreOutlined />,
  },
];
export default recruiterMenu;
