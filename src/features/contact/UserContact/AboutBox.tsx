import HeaderBox from "@/components/HeaderBox";
import { Col, Row } from "antd";
import style from "./UserContact.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const AboutBox = () => {
  return (
    <div className={cx("about-box")}>
      <HeaderBox title='Về chúng tôi' isUpperCase={true} maxWidth='100%' />
      <Row gutter={20}>
        <Col xs={0} lg={9}>
          <div className={cx("about-image")}>
            <img className={cx("image")} src='/contact-image-1.png' />
          </div>
        </Col>
        <Col xs={24} lg={15}>
          <div className={cx("about-box")}>
            <p className={cx("text")}>
              <span className='font-weight-600 secondary-color'>English GO</span> là phần mềm luyện thi tiếng Anh toàn diện, hiệu
              quả, được thiết kế để giúp người học chuẩn bị một cách hiệu quả nhất cho việc học và thi chứng chỉ tiếng Anh B1. Với
              phương châm tự tin, chinh phục và đột phá, <span className='font-weight-600 secondary-color'>English GO</span> hứa
              hẹn mang đến những trải nghiệm học tập tiếng Anh tốt nhất cho người học, phù hợp với nhu cầu của từng cá nhân.
            </p>
            <div className={cx("list-text")}>
              <div className={cx("list-header")}>Phần mềm tích hợp một số tính năng như:</div>
              <ul className={cx("list-box")}>
                <li className={cx("list-item")}>
                  <span className={cx("list-item-title")}>Tham gia luyện thi:</span>
                  Bạn có thể tham gia thi thử miễn phí ngay trên hệ thống để làm quen với việc thi tiếng anh B1.
                </li>
                <li className={cx("list-item")}>
                  <span className={cx("list-item-title")}>Đề thi sát với thực tế:</span>
                  Hệ thống bài kiểm tra mô phỏng chuẩn cấu trúc và nội dung của các kỳ thi thực tế.
                </li>
                <li className={cx("list-item")}>
                  <span className={cx("list-item-title")}>Giao diện thân thiện:</span>
                  Hệ thống cung cấp một giao diện đơn giản, dễ sử dụng, gần sát với giao diện của một số phần mềm thi tiếng Anh B1
                  của một số trường.
                </li>
                <li className={cx("list-item")}>
                  <span className={cx("list-item-title")}>Đăng ký chấm bài thi thử:</span>
                  Sau khi tham gia luyện thi, hệ thống sẽ chấm điểm bài nghe và bài đọc cho bạn một cách miễn phí. Bạn cũng có thể
                  đăng ký để được chấm bài nói và bài viết.
                </li>
              </ul>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={15}>
          <div className={cx("about-box")}>
            <p className={cx("text")}>
              <span className='font-weight-600 secondary-color'>English GO</span> đang trong quá trình hoàn thiện và phát triển
              nhằm mang đến cho người dùng một công cụ học tập và luyện thi tiếng Anh ngày càng hiệu quả hơn. Chúng tôi không
              ngừng cập nhật các tính năng mới, cải thiện giao diện và tối ưu hóa nội dung để đáp ứng tốt nhất nhu cầu của người
              học. Nếu bạn phát hiện bất kỳ lỗi nào hoặc có ý kiến góp ý, đừng ngần ngại chia sẻ với chúng tôi. Sự đóng góp của
              bạn chính là động lực để <span className='font-weight-600 secondary-color'>English GO</span> ngày càng hoàn thiện và
              đồng hành cùng bạn trên hành trình chinh phục tiếng Anh nhé.
            </p>
            <p className={cx("text")}>
              Trong quá trình sử dụng, nếu bạn gặp bất kỳ lỗi kỹ thuật hoặc khó khăn nào, vui lòng liên hệ với đội ngũ hỗ trợ của{" "}
              <span className='font-weight-600 secondary-color'>English GO</span> để được hỗ trợ nhanh chóng, kịp thời. Điều này
              không chỉ giúp cải thiện trải nghiệm của bạn mà còn hỗ trợ chúng tôi trong việc hoàn thiện và nâng cao chất lượng
              sản phẩm của chúng tôi. Mọi ý kiến đóng góp có thể được vui lòng phản hồi theo thông tin liên hệ dưới đây.
            </p>
          </div>
        </Col>
        <Col xs={24} lg={9}>
          <div className={cx("about-image")}>
            <img className={cx("image")} src='/contact-image-2.png' />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AboutBox;
