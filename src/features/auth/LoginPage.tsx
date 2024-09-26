import { Col, Image, Row } from "antd";
import style from "./auth.module.scss";
import classNames from "classnames/bind";
import LoginForm from "./components/LoginForm";
const cx = classNames.bind(style);
const LoginPageComponent = () => {
  return (
    <div className={cx("login-wrapper")}>
      <Row className='full-height' align={"stretch"}>
        <Col span={12}>
          <div className={cx("login-left-box")}>
            <div className={cx("login-title")}>
              <img className={cx("logo")} src='/src/assets/logo.png' />
              {/* <h5 className={cx("title")}>Việc ở quanh ta </h5> */}
            </div>
            <div className={cx("banner")}>
              <Image width={"80%"} src='/src/assets/banner.png' preview={false} />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={cx("login-right-box")}>
            <LoginForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default LoginPageComponent;
