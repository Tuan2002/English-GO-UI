import CardCustom from "@/components/Card";
import { AppDispatch, RootState } from "@/stores";
import { GradingActions } from "@/stores/gradingStore/gradingReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableListRegisteredExams from "./TableListRegisteredExams";

const ListRegisteredGrading = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  useEffect(() => {
    if (!currentUser?.id) return;
    dispatch(GradingActions.getListRegisteredGradeExamByExaminer(currentUser?.id));
  }, [dispatch, currentUser?.id]);
  return (
    <CardCustom title='Danh sách bài thi cần chấm' fullHeight>
      <TableListRegisteredExams role='examiner' />
    </CardCustom>
  );
};

export default ListRegisteredGrading;
