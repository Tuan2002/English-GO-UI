import ModalCustom from "@/components/Modal";
import { AppDispatch, RootState } from "@/stores";
import { PlanActions } from "@/stores/planStore/planReducer";
import { ICreateNewPlanDTO, IPlanAttributeDetailDTO } from "@/types/plan/PlanTypes";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IModalSavePlanProps {
  serviceType: string;
}
const ModalSavePlan = ({ serviceType }: IModalSavePlanProps) => {
  const { openModalSavePlan, isSubmitting, listGeneralPlanAttributes, listPlanAttributesOfPlanType } = useSelector(
    (state: RootState) => state.planStore
  );
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const onOke = () => {};
  const onCancel = () => {
    dispatch(PlanActions.changeOpenModalSavePlan(false));
  };
  const onFinish = (values: { [key: string]: string | number | boolean }) => {
    const data = [...listGeneralPlanAttributes, ...listPlanAttributesOfPlanType].map((item) => {
      if (item.dataType === "number") {
        values[item.name] = Number(values[item.name]);
      }
      if (item.dataType === "boolean") {
        values[item.name] = values[item.name] === "true" ? true : false;
      }
      return {
        id: item.id,
        name: item.name,
        value: values[item.name],
        dataType: item.dataType,
        displayName: item.displayName,
        isDefault: item.isDefault,
      };
    });
    const checkData = data.every((item) => typeof item.value === item.dataType);
    if (!checkData) {
      toast.warning("Vui lòng nhập đúng kiểu dữ liệu của thuộc tính");
      return;
    }
    const createNewPlanData: ICreateNewPlanDTO = {
      planTypeId: serviceType,
      planAttributeDetails: data.map((item) => {
        return {
          planId: serviceType,
          attributeId: item.id,
          value: item.value,
          name: item.name,
          dataType: item.dataType,
          displayName: item.displayName,
          isDefault: item.isDefault,
        } as IPlanAttributeDetailDTO;
      }),
    };
    dispatch(PlanActions.createNewPlan(createNewPlanData));
  };
  return (
    <ModalCustom
      onOK={onOke}
      width={500}
      modalTitle='Thêm mới dịch vụ'
      scrollBody
      open={openModalSavePlan}
      onCancel={onCancel}
      isLoading={isSubmitting}
    >
      <div>
        <Form
          // initialValues={initialValues}
          // form={form}
          name='saveUserForm'
          layout='vertical'
          onFinish={onFinish}
          autoComplete='off'
        >
          <Input type='hidden' name='id' />
          {[...listGeneralPlanAttributes, ...listPlanAttributesOfPlanType]?.map((item) => (
            <Form.Item
              key={item.id}
              name={item.name}
              label={item.displayName}
              rules={[{ required: true, message: `Vui lòng nhập ${item.displayName}` }]}
            >
              <Input type={item.dataType} size='large' placeholder='Mã loại dịch vụ' />
            </Form.Item>
          ))}

          <Form.Item hidden>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ModalCustom>
  );
};

export default ModalSavePlan;
