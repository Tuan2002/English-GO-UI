import { Button, Col, Row } from "antd";
import classNames from "classnames/bind";
import { BiBadgeCheck } from "react-icons/bi";
import style from "../HomePage.module.scss";
import HeaderBox from "./HeaderBox";
const cx = classNames.bind(style);
const Service = () => {
  return (
    <div className={cx("service-wrapper")}>
      <HeaderBox
        description='Được thiết kế để đem lại tối đa lợi ích cho thí sinh trong quá trình ôn luyện thi, tham dự kỳ thi cho đến lúc nhận chứng
          chỉ.'
        title='Dịch vụ của chúng tôi'
        isUpperCase
      />
      <div className={cx("services")}>
        <Row gutter={[20, 20]} align={"stretch"}>
          <Col span={12} xs={24} md={12}>
            <div className={cx("service-box")}>
              <h3>
                <img className={cx("header-icon")} src='/logo-less.png' alt='' />
                PHẦN MỀM THI THỬ ENGLISHGO
              </h3>
              <ul>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Làm quen với giao diện, các chức năng của phần mềm thi trên máy tính.
                </li>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Nắm rõ được định dạng đề thi, các bước làm bài thi.
                </li>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Ôn luyện không giới hạn với kho đề thi khổng lồ được cập nhật mới thường xuyên.
                </li>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Tương thích với mọi thiết bị: máy tính, điện thoại... Bạn có thể ôn luyện ở bất cứ đâu.
                </li>
              </ul>
            </div>
          </Col>
          <Col span={12} xs={24} md={12}>
            <div className={cx("service-box")}>
              <h3>
                <img className={cx("header-icon")} src='/logo-less.png' alt='' />
                LUYỆN ĐỀ
              </h3>
              <ul>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Luyện thi từng kỹ năng, lời giải chi tiết, script bài nghe, mẫu bài viết, bài nói...
                </li>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Ôn luyện không giới hạn với kho đề thi khổng lồ được cập nhật mới thường xuyên.
                </li>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Tương thích với mọi thiết bị: máy tính, điện thoại... Bạn có thể ôn luyện ở bất cứ đâu.
                </li>
              </ul>
            </div>
          </Col>
          <Col span={12} xs={24} md={12}>
            <div className={cx("service-box")}>
              <h3>
                <img className={cx("header-icon")} src='/logo-less.png' alt='' />
                CHẤM THI ENGLISHGO
              </h3>
              <ul>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Có ngay kết quả bài thi trắc nghiệm, tự đánh giá được năng lực hiện tại.
                </li>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Đăng ký chấm thi tự luận với giảng viên có nhiều năm kinh nghiệm.
                </li>
              </ul>
            </div>
          </Col>
          <Col span={12} xs={24} md={12}>
            <div className={cx("service-box")}>
              <h3>
                <img className={cx("header-icon")} src='/logo-less.png' alt='' />
                CÁC DỊCH VỤ KHÁC
              </h3>
              <ul>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Cung cấp toàn bộ thông tin liên quan về kỳ thi ENGLISHGO.
                </li>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Cập nhật lịch thi ENGLISHGO tại các đơn vị mới nhất, đầy đủ nhất.
                </li>
                <li>
                  <span className={cx("icon")}>
                    <BiBadgeCheck />
                  </span>
                  Tuyển sinh đầu vào, đầu ra cho các Trung tâm.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className={cx("btn-show-detail", "mt-20", "text-center")}>
        <Button type='primary' size='large'>
          Xem chi tiết các dịch vụ
        </Button>
      </div>
    </div>
  );
};
export default Service;
