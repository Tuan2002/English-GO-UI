import CardCustom from "@/components/Card";
import { Tabs } from "antd";
import GroupRoleTab from "./GroupRoleTab";
import PermissionTab from "./PermissionTab";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RoleActions } from "@/stores/roleStore/roleReducer";

const ManageRole = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(RoleActions.getAllGroupRoles());
  }, []);
  return (
    <CardCustom title='Phân quyền người dùng' fullHeight>
      <div>
        <Tabs
          // onChange={onChange}
          type='card'
          items={[
            { label: "Nhóm quyền", key: "1", children: <GroupRoleTab /> },
            { label: "Danh sách chức năng", key: "2", children: <PermissionTab /> },
          ]}
        />
      </div>
    </CardCustom>
  );
};
export default ManageRole;
