import classNames from "classnames/bind";
import style from "./auth.module.scss";
import LoginForm from "./components/LoginForm";
const cx = classNames.bind(style);
const LoginPageComponent = () => {
  return (
    <div className={cx("login-wrapper")}>
      <LoginForm />
    </div>
  );
};
export default LoginPageComponent;
