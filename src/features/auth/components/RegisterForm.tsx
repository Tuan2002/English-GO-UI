import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import style from "../auth.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
import React from "react";
import { toast } from "react-toastify";
import authService from "@/services/authService";
import { IRegisterRequestData } from "@/types/auth/RegisterType";
const cx = classNames.bind(style);

type FieldType = {
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    if (!values.username || !values.fullName || !values.password || !values.password) {
      toast.error("Vui lòng điền đầy đủ thông tin để đăng ký!");
      return;
    }
    if (values.password !== values.confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }
    setIsLoading(true);
    const dataRegister: IRegisterRequestData = {
      username: values.username,
      fullName: values.fullName,
      password: values.password,
    };
    try {
      const res = await authService.register(dataRegister);
      if (res.success) {
        toast.success("Đăng ký tài khoản thành công!");
        navigate(ROUTE_PATH.LOGIN);
      }
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className={cx("register-form-wrapper")}>
      <h4 className={cx("title")}>Đăng kí tài khoản</h4>
      <Form onFinish={onFinish} name='basic' initialValues={{ remember: true }} autoComplete='off'>
        <Form.Item<FieldType> name='username' rules={[{ required: true, message: "Vui lòng điền tên tài khoản để đăng ký!" }]}>
          <Input size='large' placeholder='Tên tài khoản' className='full-width' />
        </Form.Item>
        <Form.Item<FieldType>
          className='mt-30'
          name='fullName'
          rules={[{ required: true, message: "Vui lòng điền họ tên để nhà tuyển dụng xem hồ sơ!" }]}
        >
          <Input size='large' placeholder='Họ và tên' className='full-width' />
        </Form.Item>

        <Row justify={"space-between"} gutter={10}>
          <Col span={12}>
            <Form.Item<FieldType>
              className='mt-10'
              name='password'
              rules={[
                { required: true, message: "Vui lòng điền mật khẩu để đăng nhập!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password placeholder='Mật khẩu' size='large' className='full-width' />
            </Form.Item>
          </Col>
          <Col span={12} className=''>
            <Form.Item<FieldType>
              className='mt-10'
              name='confirmPassword'
              rules={[
                { required: true, message: "Vui lòng xác nhận lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu nhập lại không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Nhập lại mật khẩu' size='large' className='full-width' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className='mt-10'>
          <Checkbox>Tôi đồng ý với các điều khoản sử dụng của hệ thống</Checkbox>
        </Form.Item>

        <Form.Item className='mt-10'>
          <Button loading={isLoading} type='primary' htmlType='submit' className='full-width' size='large'>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      <div className='mt-10'>
        <div className='mt-20 text-center'>
          <span>Bạn đã có tài khoản </span> <Link to={ROUTE_PATH.LOGIN}>Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
