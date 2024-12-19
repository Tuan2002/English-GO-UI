import style from "../HomePage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const Achievement = () => {
  return (
    <div className={cx("container-des")}>
      <div className={cx("content")}>
        <div className={cx("text")}>
          <h2 className={cx("title-des")}>Phần mềm thi thử mô phỏng 100% phần mềm thi chính thức</h2>
          <p className={cx("description")}>
            Phần mềm được phát triển hoạt động trên mọi nền tảng từ laptop đến điện thoại để phục vụ nhu cầu ôn luyện, thi thử
            VSTEP của các bạn thí sinh trước mỗi kỳ thi. Đăng ký thi để dễ dàng với quy trình thi như sau:
          </p>
          <ul className={cx("steps")}>
            <li>
              <a href='#' className={cx("link")}>
                Đăng ký tài khoản trực tuyến
              </a>
            </li>
            <li>Hệ thống tự động cấp tài khoản thi trực tuyến ngay sau khi đăng ký, đồng thời gửi thông tin qua email</li>
            <li>Đăng nhập hệ thống, chụp hình, kiểm tra microphone và tai nghe</li>
            <li>Nhận đề, vào thi 04 kỹ năng theo đúng thứ tự: Nghe (47 phút) - Đọc (60 phút) - Viết (60 phút) - Nói (12 phút)</li>
            <li>Bấm Nộp bài khi kết thúc cả 04 kỹ năng</li>
            <li>Nhận ngay điểm thi và kết quả chi tiết phần thi trắc nghiệm, có thể đăng ký chấm thi tự luận</li>
          </ul>
        </div>
        <div className={cx("image-des")}>
          <img
            src='/laptop.png'
            alt='Screenshot of the software on a mobile phone and a laptop'
            className={cx("screenshot")}
          />
        </div>
      </div>
    </div>
  );
};
export default Achievement;
