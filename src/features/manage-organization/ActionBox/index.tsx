import { OrganizationActions } from "@/stores/organizationStore/organizationReducer";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const ActionBox = () => {
  const dispatch = useDispatch();

  const handleOpenModalSaveUser = () => {
    dispatch(OrganizationActions.changeActionModal("create"));
    dispatch(OrganizationActions.initSelectedOrganization());
    dispatch(OrganizationActions.changeOpenModalSaveOrganization(true));
  };
  return (
    <div>
      <Button type='primary' shape='round' onClick={handleOpenModalSaveUser}>
        Thêm mới
      </Button>
    </div>
  );
};
export default ActionBox;
