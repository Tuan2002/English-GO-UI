import ROUTE_PATH from "@/routes/routePath";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const examinerMenu: MenuItem[] = [
  {
    key: "1",
    label: <Link to={ROUTE_PATH.EXAMINER_DASHBOARD}>Bảng tin</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "2",
    label: <Link to={ROUTE_PATH.EXAMINER_INTRODUCTION}>Thông tin giới thiệu</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "3",
    label: <Link to={ROUTE_PATH.EXAMINER_QUESTION_BANK}>Ngân hàng câu hỏi</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "4",
    label: <Link to={ROUTE_PATH.EXAMINER_LIST_EXAM}>Danh sách bài thi</Link>,
    icon: <MailOutlined />,
  },
  {
    key: "5",
    label: <Link to={ROUTE_PATH.EXAMINER_LIST_REGISTERED_GRADE_EXAM}>Chấm bài</Link>,
    icon: <MailOutlined />,
  },
];
export default examinerMenu;
