import style from "../Carousel.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const ExamInfomation = () => {
  return (
    <div className={cx("carousel-item-wrapper")}>
      <div className={cx("carousel-item-header")}>
        <span className={cx("number")}>2</span>
        <span className={cx("title")}>Thông tin bài thi</span>
      </div>
      <div className={cx("carousel-content", "scrollbar")}>
        <div className={cx("test-device-box", "content-box")}>
          <div className={cx("test-device-item", "content-item")}>
            <h5 className={cx("title")}>
              <span className='secondary-color'>Phần 1:</span> Cấu trúc bài thi
            </h5>
            <div className={cx("content")}>
              <p>
                <span>- Kĩ năng 1: </span> LISTENING (3 phần - 35 câu hỏi ~ 47 phút)
              </p>
              <p>
                <span>- Kĩ năng 2: </span> READING (4 phần - 40 câu hỏi ~ 60 phút)
              </p>
              <p>
                <span>- Kĩ năng 3: </span> WRITING (2 phần - 2 bài viết ~ 60 phút)
              </p>
              <p>
                <span>- Kĩ năng 4: </span> SPEAKING (3 phần - 3 bài nói ~ 12 phút)
              </p>
            </div>
          </div>
          <div className={cx("test-device-item", "content-item", "mt-10")}>
            <h5 className={cx("title")}>
              <span className='secondary-color'>Phần 2:</span> Lưu ý khi làm bài
            </h5>
            <div className={cx("content")}>
              <p>- Khi hết thười gian của từng kĩ năng, hệ thống sẽ tự động chuyển qua kĩ năng tiếp theo</p>
              <p>- Thí sinh không thể thao tác với kĩ năng đã làm trước đó nếu đã chuyển qua kĩ năng tiếp theo</p>
              <p>- Để chuyển qua phần tiếp theo hoặc kĩ năng tiếp theo, thí sinh hãy bấm vào nút "Tiếp Tục"</p>
              <p>- Nếu chọn nạp bài, hệ thống sẽ nạp toàn bộ bài thi, kể cả những phần chưa làm bài</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExamInfomation;
