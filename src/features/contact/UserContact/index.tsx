import style from "./UserContact.module.scss";
import classNames from "classnames/bind";
import Container from "@/components/Container";
import AboutBox from "./AboutBox";
import ContactBox from "./ContactBox";
const cx = classNames.bind(style);
const UserContact = () => {
  return (
    <div className={cx("user-contact-wrapper")}>
      <div className={cx("banner")}>
        <div className={cx("overlay")}></div>
      </div>
      <Container>
        <AboutBox />
        <ContactBox />
      </Container>
    </div>
  );
};
export default UserContact;
