import { Col, Row } from "antd";
import style from "./auth.module.scss";
import classNames from "classnames/bind";
import RegisterForm from "./components/RegisterForm";

const cx = classNames.bind(style);

const RegisterPageComponent = () => {
  return (
    <div className={cx("register-wrapper")}>
      <Row className={cx("full-height", "register-box")} align={"stretch"}>
        <Col span={15}>
          <div className={cx("register-left-box")}>
            <RegisterForm />
          </div>
        </Col>
        <Col span={9}>
          <div className={cx("register-right-box")}>
            <div className={cx("content")}>
              <img className={cx("logo")} src='/logo.png' />
              <h5 className={cx("title")}>Tiếp lợi thế </h5>
              <h5 className={cx("title")}>Nối thành công </h5>
            </div>
            <div className={cx("register-banner")}></div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default RegisterPageComponent;
