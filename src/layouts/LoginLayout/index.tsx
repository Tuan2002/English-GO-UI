import { Outlet } from "react-router-dom";

const LoginLayout = (): JSX.Element => {
  return (
    <div>
      <div>hello</div>

      <Outlet />
    </div>
  );
};
export default LoginLayout;
