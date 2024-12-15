import style from "./ChangePassword.module.scss";
import classNames from "classnames/bind";
import { Button, Col, Form, Input, Row } from "antd";
import CardScroll from "@/components/CardScroll";

type FieldType = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const cx = classNames.bind(style);
const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values: FieldType) => {
    console.log(values);
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
