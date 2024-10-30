import ModalCustom from "@/components/Modal";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import style from "./ModalSaveOrganization.module.scss";
import classNames from "classnames/bind";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { OrganizationActions } from "@/stores/organizationStore/organizationReducer";
const cx = classNames.bind(style);

type FieldType = {
  id: string;
  name: string;
  description?: string;
};

const ModalSaveOrganization = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const saveBtnRef = React.useRef<HTMLButtonElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const { openModalSaveOrganization, isSubmitting, action, selectedOrganization } = useSelector(
    (state: RootState) => state.organizationStore
  );
  const handleSubmitForm = (value: FieldType) => {
    if (action === "create") {
      dispatch(OrganizationActions.createNewOrganization(value));
    } else {
      dispatch(OrganizationActions.updateOrganization(value));
    }
  };
  const handleConfirmSave = () => {
    saveBtnRef.current?.click();
  };
  const handleCancel = () => {
    dispatch(OrganizationActions.changeOpenModalSaveOrganization(false));
  };
  useEffect(() => {
    if (openModalSaveOrganization) {
      form.resetFields();
      form.setFieldsValue(selectedOrganization);
    }
  }, [openModalSaveOrganization, form, selectedOrganization]);
  return (
    <ModalCustom
      onOK={handleConfirmSave}
      width={500}
      modalTitle={action === "create" ? "Thêm mới đơn vị tổ chức thi" : "Cập nhật thông tin đơn vị tổ chức thi"}
      open={openModalSaveOrganization}
      onCancel={handleCancel}
      isLoading={isSubmitting}
    >
      <div className={cx("modal-content")}>
        <Form
          form={form}
          name='saveUserForm'
          layout='vertical'
          onFinish={handleSubmitForm}
          autoComplete='off'
          initialValues={selectedOrganization}
        >
          <Form.Item<FieldType> name='id' hidden>
            <Input type='text' />
          </Form.Item>
          <Form.Item<FieldType>
            name='name'
            label='Tên đơn vị tổ chức thi'
            rules={[{ required: true, message: "Vui lòng nhập tên của đơn vị tổ chức thi" }]}
          >
            <Input size='large' placeholder='Tên đơn vị tổ chức thi' />
          </Form.Item>
          <Form.Item<FieldType> name='description' label='Thông tin mô tả'>
            <TextArea size='large' placeholder='Thông tin mô tả...' />
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
export default ModalSaveOrganization;
