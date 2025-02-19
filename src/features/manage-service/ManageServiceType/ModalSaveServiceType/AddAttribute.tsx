import { IPlanAttribute } from "@/types/plan/PlanTypes";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { BiChevronLeft, BiSave } from "react-icons/bi";
import style from "./ModalSaveServiceType.module.scss";
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

interface AddAttributeProps {
  onCancel?: () => void;
  handleSaveAttribute?: (attribute: IPlanAttribute) => void;
  defaultValue?: IPlanAttribute | null;
}
const AddAttribute = ({ onCancel, handleSaveAttribute, defaultValue }: AddAttributeProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: FieldType) => {
    if (handleSaveAttribute) {
      const attribute: IPlanAttribute = {
        id: values.id ?? "",
        name: values.name,
        displayName: values.displayName,
        dataType: values.type,
        note: values.note,
        isDefault: false,
      };
      handleSaveAttribute(attribute);
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const handleSave = () => {
    form.submit();
  };

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue({
        id: defaultValue.id,
        name: defaultValue.name,
        displayName: defaultValue.displayName,
        type: defaultValue.dataType,
        note: defaultValue.note,
      });
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [defaultValue, form]);
  return (
    <div className={cx("add-attribute-box")}>
      <div className={cx("header")}>
        <button onClick={handleCancel} className={cx("button", "back-btn")}>
          <BiChevronLeft />
        </button>
        <span>Thêm thuộc tính</span>
        <button onClick={handleSave} className={cx("button", "save-btn")}>
          <BiSave />
        </button>
      </div>
      <div className={cx("modal-content")}>
        <Form
          initialValues={initialValues}
          form={form}
          name='add-attribute-form'
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
            <Input size='large' placeholder='Mã thuộc tính' />
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
            <Button type='primary' htmlType='submit'>
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default AddAttribute;
