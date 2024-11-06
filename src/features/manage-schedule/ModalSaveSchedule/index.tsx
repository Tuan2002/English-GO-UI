import ModalCustom from "@/components/Modal";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import style from "./ModalSaveSchedule.module.scss";
import classNames from "classnames/bind";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect } from "react";
import { ScheduleActions } from "@/stores/schedule/scheduleReducer";
import { ISchedule } from "@/types/schedule/ScheduleType";
const cx = classNames.bind(style);

const ModalSaveSchedule = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const saveBtnRef = React.useRef<HTMLButtonElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const { Option } = Select;
  const { openModalSaveSchedule, isSubmitting, action, selectedSchedule } = useSelector(
    (state: RootState) => state.scheduleStore
  );
  const { organizations } = useSelector((state: RootState) => state.organizationStore);
  const handleSubmitForm = (value: ISchedule) => {
    if (action === "create") {
      dispatch(ScheduleActions.createNewSchedule(value));
    } else {
      dispatch(ScheduleActions.updateSchedule(value));
    }
  };
  const handleConfirmSave = () => {
    saveBtnRef.current?.click();
  };
  const handleCancel = () => {
    dispatch(ScheduleActions.changeOpenModalSaveSchedule(false));
  };
  useEffect(() => {
    if (openModalSaveSchedule) {
      form.resetFields();
      const data = {
        ...selectedSchedule,
      };
      if (organizations && organizations?.length > 0 && openModalSaveSchedule && !selectedSchedule?.organizationId) {
        data.organizationId = organizations[0].id;
      }
      form.setFieldsValue(data);
    }
  }, [openModalSaveSchedule, form, selectedSchedule, organizations]);
  return (
    <ModalCustom
      onOK={handleConfirmSave}
      width={500}
      modalTitle={action === "create" ? "Thêm mới lịch thi" : "Cập nhật thông tin lịch thi"}
      open={openModalSaveSchedule}
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
          initialValues={selectedSchedule}
        >
          <Form.Item<ISchedule> name='id' hidden>
            <Input type='text' />
          </Form.Item>
          <Form.Item<ISchedule>
            name='examPeriod'
            label='Thời gian diễn ra'
            rules={[{ required: true, message: "Vui lòng nhập thời gian của lịch thi" }]}
          >
            <Input size='large' placeholder='Thời gian diễn ra' />
          </Form.Item>
          <Form.Item hasFeedback name='organizationId' label='Đơn vị tổ chức thi'>
            <Select size='large' placeholder='Chọn đơn vị tổ chức'>
              {organizations?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item<ISchedule>
                name='startDate'
                label='Mở đăng kí'
                rules={[{ required: true, message: "Vui lòng nhập ngày bắt đầu của kì thi" }]}
              >
                <Input size='large' type='date' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<ISchedule>
                name='endDate'
                label='Đóng đăng kí'
                rules={[{ required: true, message: "Vui lòng nhập ngày kết thúc của kì thi" }]}
              >
                <Input size='large' type='date' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<ISchedule> name='description' label='Thông tin mô tả'>
            <TextArea size='large' placeholder='Thông tin mô tả...' />
          </Form.Item>
          <Form.Item<ISchedule> name='note' label='Ghi chú'>
            <Input size='large' placeholder='Ghi chú' />
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
export default ModalSaveSchedule;
