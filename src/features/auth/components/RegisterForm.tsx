/* eslint-disable @typescript-eslint/no-explicit-any */
import ROUTE_PATH from "@/routes/routePath";
import authService from "@/services/authService";
import { IRegisterRequestData } from "@/types/auth/RegisterType";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "../auth.module.scss";
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
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className={cx("login-form-wrapper")}>
      <div className={cx("login-form-header")}>
        <img src='/logo-full-2.png' alt='logo' className={cx("logo")} />
        <h4 className={cx("title")}>Đăng ký tài khoản!</h4>
        {/* <img src='/logo-dhv.webp' alt='logo' className={cx("logo")} /> */}
      </div>
      <div className={cx("login-form")}>
        <Form onFinish={onFinish} name='basic' initialValues={{ remember: true }} autoComplete='off'>
          <Form.Item<FieldType>
            name='username'
            rules={[
              { required: true, message: "Vui lòng điền tên tài khoản để đăng ký!" },
              {
                min: 4,
                message: "Tên tài khoản phải có ít nhất 4 ký tự!",
              },
              {
                validator: (_, value) => {
                  if (value) {
                    if (value.includes(" ")) {
                      return Promise.reject("Tên tài khoản không được chứa dấu cách!");
                    }
                    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                      return Promise.reject("Tên tài khoản không được chứa ký tự đặc biệt!");
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input size='large' placeholder='Tên tài khoản' className='full-width' />
          </Form.Item>
          <Form.Item<FieldType>
            className='mt-30'
            name='fullName'
            rules={[{ required: true, message: "Vui lòng điền họ và tên của bạn!" }]}
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
                  {
                    validator: (_, value) =>
                      value && value.includes(" ") ? Promise.reject("Mật khẩu không được chứa dấu cách!") : Promise.resolve(),
                  },
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
                  {
                    validator: (_, value) =>
                      value && value.includes(" ") ? Promise.reject("Mật khẩu không được chứa dấu cách!") : Promise.resolve(),
                  },
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
    </div>
  );
};
export default RegisterForm;
