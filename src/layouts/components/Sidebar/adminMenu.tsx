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
    label: "Manage User",
    children: [
      { key: "3.1", label: <Link to={ROUTE_PATH.ADMIN_ROLES}>User Roles</Link> },
      { key: "3.2", label: <Link to={ROUTE_PATH.ADMIN_USERS}>List Users</Link> },
    ],
  },
  {
    key: "8",
    label: <Link to={ROUTE_PATH.ADMIN_QUESTION_BANK}>Question Bank</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "4",
    label: <Link to={ROUTE_PATH.ADMIN_LIST_EXAM}>Manage Exams</Link>,
    icon: <MailOutlined />,
  },
  {
    key: "5",
    label: <Link to={ROUTE_PATH.ADMIN_MANAGE_ORGANIZATION}>Manage Organization</Link>,
    icon: <MailOutlined />,
  },
  {
    key: "7",
    label: <Link to={ROUTE_PATH.ADMIN_MANAGE_SCHEDULE}>Manage Schedule</Link>,
    icon: <AppstoreOutlined />,
  },
];
export default adminMenu;
