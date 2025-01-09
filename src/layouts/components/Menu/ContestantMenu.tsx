import ROUTE_PATH from "@/routes/routePath";
import { AppstoreOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const contestantMenu: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link to={ROUTE_PATH.HOME}>Trang chủ</Link>,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: <Link to={ROUTE_PATH.EXAM}>Thi thử</Link>,
  },
  {
    key: "3",
    label: <Link to={ROUTE_PATH.CONTACT}>Liên hệ</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "4",
    icon: <MailOutlined />,
    label: "Dịch vụ",
    children: [
      { key: "4.1", label: <Link to={ROUTE_PATH.HOME}>Gói đề thi VIP</Link> },
      { key: "4.2", label: <Link to={ROUTE_PATH.HOME}>Gói chấm bài nói</Link> },
      { key: "4.3", label: <Link to={ROUTE_PATH.HOME}>Gói chấm bài viết</Link> },
    ],
  },
  {
    key: "5",
    icon: <MailOutlined />,
    label: "Tài liệu",
    children: [
      { key: "5.1", label: <Link to={ROUTE_PATH.HOME}>Hướng dẫn đăng ký thi</Link> },
      { key: "5.2", label: <Link to={ROUTE_PATH.HOME}>Hướng dẫn tham gia thi</Link> },
      { key: "5.3", label: <Link to={ROUTE_PATH.HOME}>Hướng dẫn mua gói cước</Link> },
      { key: "5.3", label: <Link to={ROUTE_PATH.HOME}>Hướng dẫn nhập mã khuyến mãi</Link> },
    ],
  },
];
export default contestantMenu;
