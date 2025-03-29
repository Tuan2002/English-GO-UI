import ModalCustom from "@/components/Modal";
import { AppDispatch, RootState } from "@/stores";
import { PlanActions } from "@/stores/planStore/planReducer";
import { useDispatch, useSelector } from "react-redux";

const ModalPlanTypeDetail = () => {
  const { openModalPlanTypeDetail, isSubmitting, currentPlanType } = useSelector((state: RootState) => state.planStore);
  const dispatch: AppDispatch = useDispatch();
  const onOke = () => {};
  const onCancel = () => {
    dispatch(PlanActions.changeOpenModalPlanTypeDetail(false));
  };
  return (
    <ModalCustom
      onOK={onOke}
      width={500}
      modalTitle={currentPlanType?.displayName}
      scrollBody
      open={openModalPlanTypeDetail}
      onCancel={onCancel}
      isLoading={isSubmitting}
    >
      <div></div>
    </ModalCustom>
  );
};

export default ModalPlanTypeDetail;
