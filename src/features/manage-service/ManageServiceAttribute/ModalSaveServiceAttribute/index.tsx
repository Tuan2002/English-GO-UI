import ModalCustom from "@/components/Modal";
import { AppDispatch, RootState } from "@/stores";
import { PlanActions } from "@/stores/planStore/planReducer";
import { ICreatePlanAttribute, IUpdatePlanAttribute } from "@/types/plan/PlanTypes";
import { Button, Form, FormProps, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ModalSaveServiceAttribute.module.scss";
const cx = classNames.bind(style);

type FieldType = {
  id?: string;
  name: string;
  displayName: string;
  type: string;
  note: string;
};

const initialValues = {
  id: null,
  name: "",
  displayName: "",
  type: "string",
  note: "",
};
const ModalSaveServiceAttribute = () => {
  const { openModalSaveServiceAttribute, isSubmitting, planAttributeData, actionModal } = useSelector(
    (state: RootState) => state.planStore
  );
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (planAttributeData?.id && actionModal === "update") {
      form.setFieldsValue({
        id: planAttributeData.id,
        name: planAttributeData.name,
        displayName: planAttributeData.displayName,
        type: planAttributeData.dataType,
        note: planAttributeData.note,
      });
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [
    actionModal,
    form,
    planAttributeData?.dataType,
    planAttributeData?.displayName,
    planAttributeData?.id,
    planAttributeData?.name,
    planAttributeData?.note,
  ]);
  const onCancel = () => {
    dispatch(PlanActions.changeOpenModalSaveServiceAttribute(false));
  };
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: FieldType) => {
    if (actionModal === "create") {
      const dataCreate: ICreatePlanAttribute = {
        planAttributes: [
          {
            id: "",
            name: values.name,
            displayName: values.displayName,
            dataType: values.type,
            note: values.note,
            isDefault: true,
            planTypeId: undefined,
          },
        ],
      };
      dispatch(PlanActions.createNewPlanAttributes(dataCreate));
    } else {
      if (!planAttributeData) return;
      const dataUpdate: IUpdatePlanAttribute = {
        ...planAttributeData,
        name: values.name,
        displayName: values.displayName,
        dataType: values.type,
        note: values.note,
      };
      dispatch(PlanActions.updatePlanAttribute(dataUpdate));
    }
  };

  const onOke = () => {
    if (saveBtnRef.current) {
      saveBtnRef.current.click();
    }
  };

  return (
    <ModalCustom
      onOK={onOke}
      width={500}
      modalTitle='Thêm thuộc tính chung'
      scrollBody
      open={openModalSaveServiceAttribute}
      onCancel={onCancel}
      isLoading={isSubmitting}
    >
      <div className={cx("modal-content")}>
        <Form
          initialValues={initialValues}
          form={form}
          name='saveUserForm'
          layout='vertical'
          onFinish={onFinish}
          autoComplete='off'
        >
          <Input type='hidden' name='id' />
          <Form.Item<FieldType>
            name='name'
            label='Mã thuộc tính'
            rules={[{ required: true, message: "Vui lòng nhập mã của thuộc tính" }]}
          >
            <Input disabled={actionModal === "update"} size='large' placeholder='Mã thuộc tính' />
          </Form.Item>
          <Form.Item<FieldType>
            name='displayName'
            label='Tên hiển thị'
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị của thuộc tính" }]}
          >
            <Input size='large' placeholder='Tên hiển thị của thuộc tính' />
          </Form.Item>
          <Form.Item<FieldType>
            name='type'
            label='Loại giá trị'
            rules={[{ required: true, message: "Vui lòng chọn loại giá trị của thuộc tính" }]}
          >
            <Select size='large' placeholder='Chọn loại giá trị của thuộc tính'>
              <Select.Option value='string'>String</Select.Option>
              <Select.Option value='number'>Number</Select.Option>
              <Select.Option value='boolean'>Boolean</Select.Option>
              <Select.Option value='date'>Date</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType> name='note' label='Ghi chú'>
            <TextArea aria-multiline size='large' placeholder='Nhập thông tin ghi chú' />
          </Form.Item>
          <Form.Item hidden>
            <Button ref={saveBtnRef} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ModalCustom>
  );
};
export default ModalSaveServiceAttribute;
