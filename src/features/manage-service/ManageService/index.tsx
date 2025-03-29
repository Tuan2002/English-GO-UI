import ButtonAddNew from "@/components/Button/ButtonAddNew";
import ButtonDelete from "@/components/Button/ButtonDelete";
import ButtonShow from "@/components/Button/ButtonShow";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import CardCustom from "@/components/Card";
import { AppDispatch, RootState } from "@/stores";
import { PlanActions } from "@/stores/planStore/planReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalPlanTypeDetail from "./ModalPlanTypeDetail";
import ModalSavePlan from "./ModalSavePlan";

const ManageServiceType = () => {
  const dispatch: AppDispatch = useDispatch();
  const { serviceType } = useParams();
  const { currentPlanType, loading } = useSelector((state: RootState) => state.planStore);

  useEffect(() => {
    dispatch(PlanActions.getGeneralPlanAttributes());
  }, [dispatch]);

  useEffect(() => {
    if (!serviceType) {
      return;
    }
    const getServiceTypeDetail = async () => {
      dispatch(PlanActions.getPlanTypeById(serviceType));
    };
    const getPlanAttributeByType = async () => {
      dispatch(PlanActions.getPlanAttributeOfPlanType(serviceType));
    };
    const getGeneralPlanAttributes = async () => {
      dispatch(PlanActions.getGeneralPlanAttributes());
    };
    getServiceTypeDetail();
    getPlanAttributeByType();
    getGeneralPlanAttributes();
  }, [dispatch, serviceType]);

  const handleOpenModalPlanTypeDetail = () => {
    dispatch(PlanActions.changeOpenModalPlanTypeDetail(true));
  };
  const handleOpenModalSavePlan = () => {
    dispatch(PlanActions.changeOpenModalSavePlan(true));
  };

  return (
    <CardCustom
      loading={loading}
      showBackButton
      cardHeader={
        <div className='d-flex justify-content-between align-items-center'>
          <span>{currentPlanType?.displayName}</span>
          <div className='d-flex gap-10'>
            <ButtonShow onClick={handleOpenModalPlanTypeDetail} />
            <ButtonUpdate onClick={() => {}} />
            <ButtonDelete onClick={() => {}} onConfirmDelete={() => {}} />
            <ButtonAddNew onClick={handleOpenModalSavePlan} />
          </div>
        </div>
      }
      fullHeight
    >
      <div className='mt-10'>{/* <TableServiceType /> */}</div>
      <div>
        <ModalSavePlan serviceType={serviceType ?? ""} />
        <ModalPlanTypeDetail />
      </div>
    </CardCustom>
  );
};
export default ManageServiceType;
