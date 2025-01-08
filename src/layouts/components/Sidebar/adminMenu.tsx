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
    key: "2",
    icon: <DesktopOutlined />,
    label: "Quản lý người dùng",
    children: [
      { key: "2.1", label: <Link to={ROUTE_PATH.ADMIN_ROLES}>Phân quyền</Link> },
      { key: "2.2", label: <Link to={ROUTE_PATH.ADMIN_USERS}>Danh sách người dùng</Link> },
    ],
  },
  {
    key: "3",
    label: <Link to={ROUTE_PATH.ADMIN_QUESTION_BANK}>Ngân hàng câu hỏi</Link>,
    icon: <AppstoreOutlined />,
  },

  {
    key: "4",
    label: <Link to={ROUTE_PATH.ADMIN_MANAGE_ORGANIZATION}>Đơn vị tổ chức thi</Link>,
    icon: <MailOutlined />,
  },
  {
    key: "5",
    label: <Link to={ROUTE_PATH.ADMIN_MANAGE_SCHEDULE}>Quản lý lịch thi</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "6",
    icon: <MailOutlined />,
    label: "Quản lý bài thi",
    children: [
      { key: "6.1", label: <Link to={ROUTE_PATH.ADMIN_LIST_EXAM}>Tổng hợp bài thi</Link> },
      { key: "6.2", label: <Link to={ROUTE_PATH.ADMIN_LIST_SPEAKING_EXAM}>Chấm bài thi nói</Link> },
      { key: "6.3", label: <Link to={ROUTE_PATH.ADMIN_LIST_WRITING_EXAM}>Chấm bài thi viết</Link> },
    ],
  },
];
export default adminMenu;
