import { ScheduleActions } from "@/stores/schedule/scheduleReducer";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const ActionBox = () => {
  const dispatch = useDispatch();

  const handleOpenModalSaveUser = () => {
    dispatch(ScheduleActions.changeActionModal("create"));
    dispatch(ScheduleActions.initSelectedSchedule());
    dispatch(ScheduleActions.changeOpenModalSaveSchedule(true));
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
