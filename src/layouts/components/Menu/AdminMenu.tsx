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
    label: <Link to={ROUTE_PATH.ADMIN_LIST_EXAM}>Tổng hợp bài thi</Link>,
  },
  {
    key: "11",
    icon: <MailOutlined />,
    label: <Link to={ROUTE_PATH.ADMIN_LIST_REGISTERED_GRADE_EXAM}>Chấm bài</Link>,
  },
  {
    key: "7",
    icon: <MailOutlined />,
    label: <Link to={ROUTE_PATH.ADMIN_FEEDBACK}>Phản hồi từ người dùng</Link>,
  },
  {
    key: "8",
    icon: <MailOutlined />,
    label: <Link to={ROUTE_PATH.ADMIN_EVALUATE}>Đánh giá từ người dùng</Link>,
  },

  {
    key: "9",
    icon: <MailOutlined />,
    label: "Quản lý dịch vụ",
    children: [
      { key: "9.1", label: <Link to={ROUTE_PATH.ADMIN_MANAGE_SERVICE_ATTRIBUTE}>Các đặc điểm của dịch vụ</Link> },
      { key: "9.2", label: <Link to={ROUTE_PATH.ADMIN_MANAGE_SERVICE_TYPE}>Danh sách các dịch vụ</Link> },
    ],
  },
];
export default adminMenu;
