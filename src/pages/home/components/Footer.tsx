import style from "../HomePage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const Footer = () => {
  return (
    <div className={cx("footer")}>
      <div className={cx("footer-column")}>
        <p className={cx("brand")}>luyenthi.vstep.vn</p>
        <p>Luôn đặt lợi ích của thí sinh lên hàng đầu</p>
        <div className={cx("contact-info")}>
          <img
            alt='Zalo icon'
            src='https://storage.googleapis.com/a1aa/image/qp9ZDoEOkp7nMNw61dcOQfJb6nZb2bzwat0FbebQhqLAE26TA.jpg'
          />
          <p>0902710030</p>
        </div>
        <div className={cx("contact-info")}>
          <img
            alt='Facebook icon'
            src='https://storage.googleapis.com/a1aa/image/MBKdSh14Kx4bF5Kn5sq10qsgypiQqIuHJAQcFrsodb4fBb9JA.jpg'
          />
          <p>luyenthi.vstep.vn</p>
        </div>
        <div className={cx("contact-info")}>
          <img
            alt='Messenger icon'
            src='https://storage.googleapis.com/a1aa/image/JxQ547De2vwQOa25duc15vfBV0j4TxBicZusIzZuviCeHs1nA.jpg'
          />
          <p>luyenthi.vstep.vn</p>
        </div>
      </div>
      <div className={cx("footer-column")}>
        <h3>Dịch vụ</h3>
        <a href='#'>Thi thử</a>
        <a href='#'>Luyện đề</a>
        <a href='#'>Tài khoản VIP</a>
        <a href='#'>Chấm thi tự luận</a>
      </div>
      <div className={cx("footer-column")}>
        <h3>Thông tin VSTEP</h3>
        <a href='#'>Lịch thi VSTEP</a>
        <a href='#'>Hướng dẫn sử dụng</a>
      </div>
    </div>
  );
};
export default Footer;
