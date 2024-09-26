import ROUTE_PATH from "@/routes/routePath";
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const managerMenu: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link to={ROUTE_PATH.MANAGER_DASHBOARD}>Dashboard</Link>,
  },
  // {
  //   key: "2",
  //   icon: <ContainerOutlined />,
  //   label: "Quản lý chung",
  //   children: [
  //     { key: "2.1", label: <Link to={ROUTE_PATH.ADMIN_PROFESSIONS}>Ngành nghề tuyển dụng</Link> },
  //     { key: "2.2", label: <Link to={ROUTE_PATH.ADMIN_POSITIONS}>Vị trí tuyển dụng</Link> },
  //     { key: "2.3", label: <Link to={ROUTE_PATH.ADMIN_EXPERIENCES}>Kinh nghiệm làm việc</Link> },
  //     { key: "2.4", label: <Link to={ROUTE_PATH.ADMIN_SALARY_RANGES}>Mức lương</Link> },
  //     { key: "2.6", label: <Link to={ROUTE_PATH.ADMIN_JOB_LOCATIONS}>Địa điểm làm việc</Link> },
  //   ],
  // },
  // {
  //   key: "3",
  //   icon: <DesktopOutlined />,
  //   label: "Quản lý người dùng",
  //   children: [
  //     { key: "3.1", label: <Link to={ROUTE_PATH.ADMIN_ROLES}>Phân quyền người dùng</Link> },
  //     { key: "3.2", label: <Link to={ROUTE_PATH.ADMIN_USERS}>Quản lý người dùng</Link> },
  //   ],
  // },
  {
    key: "8",
    label: <Link to={ROUTE_PATH.MANAGER_COMPANY}>Quản lý công ty</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "4",
    label: "Quản lý nhà tuyển dụng",
    icon: <MailOutlined />,
  },
  {
    key: "5",
    label: "Quản lý ứng viên",
    icon: <AppstoreOutlined />,
  },

  {
    key: "6",
    label: "Quản lý mẫu CV",
    icon: <AppstoreOutlined />,
  },
  {
    key: "7",
    label: "Quản lý bài tuyển dụng",
    icon: <AppstoreOutlined />,
  },
];
export default managerMenu;
