import { RootState } from "@/stores";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import GropuRoleItem from "./GroupRoleItem";

const GroupRoleTab = () => {
  const { groupRoles } = useSelector((state: RootState) => state.roleStore);
  return (
    <div>
      <Tabs
        tabPosition={"left"}
        defaultActiveKey={groupRoles?.[0]?.id}
        items={
          groupRoles?.map((groupRole) => ({
            label: groupRole.displayName,
            key: String(groupRole?.id), // Ensure key is always a string
            children: <GropuRoleItem groupRole={groupRole} />,
          })) || []
        }
      />
    </div>
  );
};
export default GroupRoleTab;
