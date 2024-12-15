/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Col, Form, FormProps, Input, Row } from "antd";
import { IoLogoGoogleplus } from "react-icons/io";
import style from "../auth.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
import { toast } from "react-toastify";
import authService from "@/services/authService";
import { ILoginRequestData } from "@/types/auth/LoginType";
import React from "react";
import { useDispatch } from "react-redux";
import { authAction } from "@/stores/authStore/authReducer";
const cx = classNames.bind(style);

type FieldType = {
  username?: string;
  password?: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values: FieldType) => {
    if (!values.username || !values.password) {
      toast.error("Vui lòng điền đầy đủ thông tin để đăng nhập!");
      return;
    }
    setIsLoading(true);
    try {
      const loginData: ILoginRequestData = {
        username: values.username,
        password: values.password,
        isRememberMe: true,
      };
      const res = await authService.login(loginData);
      if (res.success) {
        toast.success("Đăng nhập thành công!");
        // set token to local storage
        localStorage.setItem("accessToken", res.data.accessToken.token);
        dispatch<any>(authAction.getCurrentUser());
        navigate(ROUTE_PATH.HOME);
      }
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleLoginSSO = () => {
    const requestId = new Date().valueOf().toString();
    const AUTH_URL = "https://login.vinhuni.edu.vn";
    const response_type = "id_token token";
    const client_id = "english-contest";
    const state = requestId;
    const redirect_uri = "http://localhost:5173/auth/callback";
    const scope = "openid profile email";
    const nonce = requestId;

    // Tạo query string cho phần /connect/authorize/callback
    const returnUrl = `/connect/authorize/callback?response_type=${encodeURIComponent(
      response_type
    )}&client_id=${encodeURIComponent(client_id)}&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&scope=${encodeURIComponent(scope)}&nonce=${encodeURIComponent(nonce)}`;

    // Mã hóa URL ReturnUrl
    const encodedReturnUrl = encodeURIComponent(returnUrl);

    // Tạo URL login
    const loginURL = `${AUTH_URL}/Account/Login?ReturnUrl=${encodedReturnUrl}`;
    window.location.href = loginURL;
  };

  return (
    <div className={cx("login-form-wrapper")}>
      <h4 className={cx("title")}>Đăng nhập tài khoản</h4>
      <Form name='basic' initialValues={{ remember: true }} autoComplete='off' onFinish={onFinish}>
        <Form.Item<FieldType> name='username' rules={[{ required: true, message: "Vui lòng điền tài khoản để đăng nhập!" }]}>
          <Input autoFocus size='large' placeholder='Tên tài khoản' className='full-width' />
        </Form.Item>

        <Form.Item<FieldType>
          className='mt-30'
          name='password'
          rules={[{ required: true, message: "Vui lòng điền mật khẩu để đăng nhập!" }]}
        >
          <Input.Password placeholder='Password' size='large' className='full-width' />
        </Form.Item>

        <Row justify={"space-between"} className='mt-10'>
          <Col span={12}>
            <Checkbox>Nhớ tài khoản</Checkbox>
          </Col>
          <Col span={12} className='text-end'>
            <Link className='' to={ROUTE_PATH.FORGET_PASSWORD}>
              Quên mật khẩu?
            </Link>
          </Col>
        </Row>

        <Form.Item className='mt-30'>
          <Button loading={isLoading} type='primary' htmlType='submit' className='full-width' size='large'>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <div className='mt-10'>
        <p className='text-center'>Hoặc</p>
        <div className={cx("social-login", "text-center", "mt-10")}>
          <Button onClick={handleLoginSSO} type='primary' danger size='large' icon={<IoLogoGoogleplus className={cx("icon")} />}>
            Đăng nhập với SSO VinhUni
          </Button>
        </div>
        <div className='mt-20 text-center'>
          <span>Bạn chưa có tài khoản </span> <Link to={ROUTE_PATH.REGISTER}>Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
