import ROUTE_PATH from "@/routes/routePath";
import { AppstoreOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const adminMenu: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "3",
    icon: <DesktopOutlined />,
    label: "Quản lý người dùng",
    children: [
      { key: "3.1", label: <Link to={ROUTE_PATH.ADMIN_ROLES}>Phân quyền người dùng</Link> },
      { key: "3.2", label: <Link to={ROUTE_PATH.ADMIN_USERS}>Quản lý người dùng</Link> },
    ],
  },
  {
    key: "8",
    label: <Link to={ROUTE_PATH.ADMIN_QUESTION_BANK}>Ngân hàng câu hỏi</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "4",
    label: <Link to={ROUTE_PATH.ADMIN_LIST_EXAM}>Danh sách bài thi</Link>,
    icon: <MailOutlined />,
  },
];
export default adminMenu;
