import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { QuestionActions } from "@/stores/questionStore/questionReducer";
import { useDispatch, useSelector } from "react-redux";
import QuestionDetail from "../../components/QuestionDetail";

const ModalShowQuestionDetail = () => {
  const { openModalShowQuestionDetail, selectedQuestion } = useSelector((state: RootState) => state.questionStore);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(QuestionActions.changeOpenModalShowQuestionDetail(false));
    dispatch(QuestionActions.changeSelectedQuestion(undefined));
    dispatch(QuestionActions.changeActionModal("create"));
  };
  const handleUpdateQuesiton = () => {
    dispatch(QuestionActions.changeOpenModalSaveQuestion(true));
    dispatch(QuestionActions.changeOpenModalShowQuestionDetail(false));
    dispatch(QuestionActions.changeActionModal("update"));
  };
  return (
    <ModalCustom
      confirmTitle='Update'
      width={800}
      scrollBody
      open={openModalShowQuestionDetail}
      onOK={handleUpdateQuesiton}
      onCancel={handleCancel}
      modalTitle={"Question Detail"}
    >
      {selectedQuestion && <QuestionDetail question={selectedQuestion} />}
    </ModalCustom>
  );
};
export default ModalShowQuestionDetail;
