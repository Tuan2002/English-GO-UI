import classNames from "classnames/bind";
import AboutBox from "./AboutBox";
import ContactBox from "./ContactBox";
import EvaluateBox from "./EvaluateBox";
import FeedbackBox from "./FeedbackBox";
import style from "./UserContact.module.scss";
const cx = classNames.bind(style);
const UserContact = () => {
  return (
    <div className={cx("user-contact-wrapper")}>
      <div className={cx("banner")}>
        <div className={cx("overlay")}></div>
      </div>
      <AboutBox />
      <FeedbackBox />
      <EvaluateBox />
      <ContactBox />
    </div>
  );
};
export default UserContact;
