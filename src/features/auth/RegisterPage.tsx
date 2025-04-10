import classNames from "classnames/bind";
import style from "./auth.module.scss";
import RegisterForm from "./components/RegisterForm";

const cx = classNames.bind(style);

const RegisterPageComponent = () => {
  return (
    <div className={cx("login-wrapper")}>
      <RegisterForm />
    </div>
  );
};
export default RegisterPageComponent;
