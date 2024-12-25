import style from "./ChangePassword.module.scss";
import classNames from "classnames/bind";
import { Button, Col, Form, Input, Row } from "antd";
import CardScroll from "@/components/CardScroll";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { authAction } from "@/stores/authStore/authReducer";
import { toast } from "react-toastify";

type FieldType = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const cx = classNames.bind(style);
const ChangePassword = () => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();

  const onFinish = (values: FieldType) => {
    if (!values.oldPassword || !values.newPassword || !values.confirmPassword) return;
    if (values.newPassword !== values.confirmPassword) {
      form.setFields([
        {
          name: "confirmPassword",
          errors: ["Mật khẩu xác nhận không khớp!"],
        },
      ]);
      return;
    }
    dispatch(
      authAction.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
    ).then((res: any) => {
      if (res.payload.success) {
        form.resetFields();
        toast.success(res.payload.message);
      } else {
        if (res.payload?.data?.field) {
          form.setFields([
            {
              name: res.payload.data.field,
              errors: [res.payload.message],
            },
          ]);
        }
        toast.error(res.payload?.message);
      }
    });
  };
  return (
    <CardScroll cardHeader='Đổi mật khẩu'>
      <div className={"exam-history-list"}>
        <div className={cx("form")}>
          <Form form={form} name='saveUserForm' layout='vertical' onFinish={onFinish} autoComplete='off'>
            <Row gutter={[10, 10]}>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  name='oldPassword'
                  label='Mật khẩu hiện tại'
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
                    { pattern: /^\S*$/, message: "Mật khẩu không được chứa dấu cách!" },
                  ]}
                >
                  <Input.Password size='large' placeholder='Nhập mật khẩu hiện tại của bạn!' />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[10, 10]}>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  name='newPassword'
                  label='Mật khẩu mới'
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                    { pattern: /^\S*$/, message: "Mật khẩu không được chứa dấu cách!" },
                  ]}
                >
                  <Input.Password size='large' placeholder='Nhập mật khẩu mới của bạn' />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[10, 10]}>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  name='confirmPassword'
                  label='Xác nhận mật khẩu'
                  dependencies={["newPassword"]}
                  rules={[
                    { required: true, message: "Vui lòng xác nhận lại mật khẩu!" },
                    { pattern: /^\S*$/, message: "Mật khẩu không được chứa dấu cách!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password size='large' placeholder='Nhập lại mật khẩu mới của bạn' />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </CardScroll>
  );
};

export default ChangePassword;
