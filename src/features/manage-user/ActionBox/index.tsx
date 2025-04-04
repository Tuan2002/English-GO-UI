import { UserActions } from "@/stores/userStore/userReducer";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const ActionBox = () => {
  const dispatch = useDispatch();

  const handleOpenModalSaveUser = () => {
    dispatch(UserActions.openModalCreateUser());
  };
  return (
    <div>
      <Button type='primary' shape='round' onClick={handleOpenModalSaveUser}>
        Thêm người dùng
      </Button>
    </div>
  );
};
export default ActionBox;
