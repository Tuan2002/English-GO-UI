import CardCustom from "@/components/Card";
import { AppDispatch } from "@/stores";
import { PlanActions } from "@/stores/planStore/planReducer";
import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalSaveServiceType from "./ModalSaveServiceType";
import TableServiceType from "./TableServiceType";

const ManageServiceType = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleOpenModalSaveServiceType = () => {
    dispatch(PlanActions.changeOpenModalSaveServiceType(true));
  };
  useEffect(() => {
    dispatch(PlanActions.getGeneralPlanAttributes());
    dispatch(PlanActions.getAllPlanTypes());
  }, [dispatch]);
  return (
    <CardCustom
      cardHeader={
        <div className='d-flex justify-content-between align-items-center'>
          <span>Danh sách loại dịch vụ</span>
          <Button onClick={handleOpenModalSaveServiceType} type='primary'>
            Thêm mới loại dịch vụ
          </Button>
        </div>
      }
      fullHeight
    >
      <div className='mt-10'>
        <TableServiceType />
      </div>
      <div>
        <ModalSaveServiceType />
      </div>
    </CardCustom>
  );
};
export default ManageServiceType;
