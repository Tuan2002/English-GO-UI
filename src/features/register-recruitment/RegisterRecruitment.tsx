import style from "./RegisterRecruitment.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import Banner from "./Banner";
import ReasonRegisterRecruitment from "./Reason";
import FormRegisterRecruitment from "./FormRegisterRecruitment";
import CompanyInfomationModal from "./CompanyInfomationModal";
const RegisterRecruitment = () => {
  return (
    <div className={cx("register-recruitment-wrapper")}>
      <Banner />
      <ReasonRegisterRecruitment />
      <FormRegisterRecruitment />
      <CompanyInfomationModal />
    </div>
  );
};
export default RegisterRecruitment;
