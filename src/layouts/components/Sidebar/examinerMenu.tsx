import ROUTE_PATH from "@/routes/routePath";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const examinerMenu: MenuItem[] = [
  {
    key: "8",
    label: <Link to={ROUTE_PATH.EXAMINER_QUESTION_BANK}>Ngân hàng câu hỏi</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "4",
    label: <Link to={ROUTE_PATH.EXAMINER_LIST_EXAM}>Danh sách bài thi</Link>,
    icon: <MailOutlined />,
  },
];
export default examinerMenu;
