import { Col, Image, Row } from "antd";
import style from "./auth.module.scss";
import classNames from "classnames/bind";
import LoginForm from "./components/LoginForm";
const cx = classNames.bind(style);
const LoginPageComponent = () => {
  return (
    <div className={cx("login-wrapper")}>
      <Row className='full-height' align={"stretch"}>
        <Col span={12} xs={0} sm={0} md={12}>
          <div className={cx("login-left-box")}>
            <div className={cx("login-title")}>
              <img className={cx("logo")} src='/logo.png' />
              {/* <h5 className={cx("title")}>Việc ở quanh ta </h5> */}
            </div>
            <div className={cx("banner")}>
              <Image width={"80%"} src='/banner.png' preview={false} />
            </div>
          </div>
        </Col>
        <Col span={12} xs={24} sm={24} md={12}>
          <div className={cx("login-right-box")}>
            <LoginForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default LoginPageComponent;
