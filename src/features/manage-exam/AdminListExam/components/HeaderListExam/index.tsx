import { AppDispatch } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const HeaderListExam = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleOpenModalChooseUser = () => {
    dispatch(ExamActions.changeIsOpenModalChooseUser(true));
  };
  return (
    <div>
      <Button onClick={handleOpenModalChooseUser} type='primary'>
        Chọn thí sinh
      </Button>
    </div>
  );
};
export default HeaderListExam;
