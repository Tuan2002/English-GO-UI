import { IGroupRole } from "@/types/groupRole/GroupRoleType";
import style from "./GroupRoleTab.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface IGroupRoleItemProps {
  groupRole: IGroupRole;
}

const GropuRoleItem = ({ groupRole }: IGroupRoleItemProps) => {
  return (
    <div className={cx("group-role-item")}>
      <div>Các chức năng của {groupRole.displayName}</div>
    </div>
  );
};
export default GropuRoleItem;
