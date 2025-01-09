import type { MenuProps } from "antd";
import { Menu } from "antd";
import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Version from "@/components/Version";
import adminMenu from "../Menu/AdminMenu";
import examinerMenu from "../Menu/ExaminerMenu";
const cx = classNames.bind(style);

type MenuItem = Required<MenuProps>["items"][number];

interface ISidebarProps {
  collapsed: boolean;
  menuType?: "admin" | "examiner";
}

const Sidebar = ({ collapsed, menuType = "admin" }: ISidebarProps): JSX.Element => {
  const items: MenuItem[] = menuType === "admin" ? adminMenu : examinerMenu;
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
      <Version />
    </div>
  );
};

export default Sidebar;
