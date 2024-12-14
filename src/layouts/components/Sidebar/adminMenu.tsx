import ROUTE_PATH from "@/routes/routePath";
import { AppstoreOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const adminMenu: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Bảng tin",
  },
  {
    key: "3",
    icon: <DesktopOutlined />,
    label: "Quản lý người dùng",
    children: [
      { key: "3.1", label: <Link to={ROUTE_PATH.ADMIN_ROLES}>Phân quyền</Link> },
      { key: "3.2", label: <Link to={ROUTE_PATH.ADMIN_USERS}>Danh sách người dùng</Link> },
    ],
  },
  {
    key: "8",
    label: <Link to={ROUTE_PATH.ADMIN_QUESTION_BANK}>Ngân hàng câu hỏi</Link>,
    icon: <AppstoreOutlined />,
  },
  // {
  //   key: "4",
  //   label: <Link to={ROUTE_PATH.ADMIN_LIST_EXAM}>Quản lý bài thi</Link>,
  //   icon: <MailOutlined />,
  // },
  {
    key: "5",
    label: <Link to={ROUTE_PATH.ADMIN_MANAGE_ORGANIZATION}>Đơn vị tổ chức thi</Link>,
    icon: <MailOutlined />,
  },
  {
    key: "7",
    label: <Link to={ROUTE_PATH.ADMIN_MANAGE_SCHEDULE}>Quản lý lịch thi</Link>,
    icon: <AppstoreOutlined />,
  },
];
export default adminMenu;
