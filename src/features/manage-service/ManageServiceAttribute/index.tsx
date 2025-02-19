import CardCustom from "@/components/Card";
import { AppDispatch } from "@/stores";
import { PlanActions } from "@/stores/planStore/planReducer";
import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalSaveServiceAttribute from "./ModalSaveServiceAttribute";
import TableGeneralPlanAttribute from "./TableGeneralPlanAttribute";

const ManageServiceAttribute = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleAddNewAttribute = () => {
    dispatch(PlanActions.setPlanAttributeData(null));
    dispatch(PlanActions.changeActionModal("create"));
    dispatch(PlanActions.changeOpenModalSaveServiceAttribute(true));
  };

  useEffect(() => {
    dispatch(PlanActions.getGeneralPlanAttributes());
  }, [dispatch]);

  return (
    <CardCustom fullHeight title='Các thuộc tính chung của dịch vụ'>
      <div className='d-flex justify-content-end'>
        <Button onClick={handleAddNewAttribute} type='primary'>
          Thêm thuộc tính mới
        </Button>
      </div>
      <div className='mt-10'>
        <TableGeneralPlanAttribute />
      </div>
      <div>
        <ModalSaveServiceAttribute />
      </div>
    </CardCustom>
  );
};
export default ManageServiceAttribute;
