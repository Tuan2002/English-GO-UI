import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
import adminMenu from "./adminMenu";
import managerMenu from "./managerMenu";
import recruiterMenu from "./recruiterMenu";
const cx = classNames.bind(style);

type MenuItem = Required<MenuProps>["items"][number];

interface ISidebarProps {
  collapsed: boolean;
  menuType?: "admin" | "manager" | "recruiter";
}

const Sidebar = ({ collapsed, menuType = "admin" }: ISidebarProps): JSX.Element => {
  const items: MenuItem[] = menuType === "admin" ? adminMenu : menuType === "manager" ? managerMenu : recruiterMenu;
  return (
    <div className={cx("menu", "scrollbar")}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode='inline'
        theme='light'
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default Sidebar;
