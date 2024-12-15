import style from "./HomePage.module.scss";
import classNames from "classnames/bind";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays, faCircleCheck, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BiBadgeCheck, BiHeadphone, BiIdCard } from "react-icons/bi";

const cx = classNames.bind(style);

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "https://via.placeholder.com/800x400?text=Slide+1",
    "https://via.placeholder.com/800x400?text=Slide+2",
    "https://via.placeholder.com/800x400?text=Slide+3",
    "https://via.placeholder.com/800x400?text=Slide+4",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className={cx("banner")}>
        <div className={cx("content")}>
          <h1 className={cx("title")}>Thi thử VSTEP trực tuyến miễn phí</h1>
          <p className={cx("description")}>
            Tra cứu toàn bộ thông tin về chứng chỉ tiếng Anh VSTEP, lịch thi VSTEP mới nhất, thi thử VSTEP trực tuyến miễn phí.
          </p>
          <div className={cx("home-button")}>
            <div className={cx("button-container")}>
              <a href='#' className={cx("button", "button-primary")}>
                Vào thi ngay <BiHeadphone />
              </a>

              <a href='#' className={cx("button", "button-secondary")}>
                Lịch thi mới nhất <BiIdCard />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <h1>Dịch vụ của chúng tôi</h1>
          <p>
            Được thiết kế để đem lại tối đa lợi ích cho thí sinh trong quá trình ôn luyện thi, tham dự kỳ thi cho đến lúc nhận
            chứng chỉ.
          </p>
        </div>
        <div className={cx("services")}>
          <div className={cx("service-box")}>
            <h3>PHẦN MỀM THI THỬ VSTEP</h3>
            <ul>
              <li>
                <BiBadgeCheck /> Làm quen với giao diện, các chức năng của phần mềm thi trên máy tính.
              </li>
              <li>
                <BiBadgeCheck /> Nắm rõ được định dạng đề thi, các bước làm bài thi.
              </li>
              <li>
                <BiBadgeCheck /> Ôn luyện không giới hạn với kho đề thi khổng lồ được cập nhật mới thường xuyên.
              </li>
              <li>
                <BiBadgeCheck /> Tương thích với mọi thiết bị: máy tính, điện thoại... Bạn có thể ôn luyện ở bất cứ đâu.
              </li>
            </ul>
          </div>
          <div className={cx("service-box")}>
            <h3>LUYỆN ĐỀ</h3>
            <ul>
              <li>
                <BiBadgeCheck /> Luyện thi từng kỹ năng, lời giải chi tiết, script bài nghe, mẫu bài viết, bài nói...
              </li>
              <li>
                <BiBadgeCheck /> Ôn luyện không giới hạn với kho đề thi khổng lồ được cập nhật mới thường xuyên.
              </li>
              <li>
                <BiBadgeCheck /> Tương thích với mọi thiết bị: máy tính, điện thoại... Bạn có thể ôn luyện ở bất cứ đâu.
              </li>
            </ul>
          </div>
          <div className={cx("service-box")}>
            <h3>CHẤM THI VSTEP</h3>
            <ul>
              <li>
                <BiBadgeCheck /> Có ngay kết quả bài thi trắc nghiệm, tự đánh giá được năng lực hiện tại.
              </li>
              <li>
                <BiBadgeCheck /> Đăng ký chấm thi tự luận với giảng viên có nhiều năm kinh nghiệm.
              </li>
            </ul>
          </div>
          <div className={cx("service-box")}>
            <h3>CÁC DỊCH VỤ KHÁC</h3>
            <ul>
              <li>
                <BiBadgeCheck /> Cung cấp toàn bộ thông tin liên quan về kỳ thi VSTEP.
              </li>
              <li>
                <BiBadgeCheck /> Cập nhật lịch thi VSTEP tại các đơn vị mới nhất, đầy đủ nhất.
              </li>
              <li>
                <BiBadgeCheck /> Tuyển sinh đầu vào, đầu ra cho các Trung tâm.
              </li>
            </ul>
          </div>
        </div>
        <a className={cx("cta-button")} href='#'>
          Xem chi tiết các dịch vụ
          <i className='fas fa-arrow-right'></i>
        </a>
      </div>

      <div className={cx("container-status")}>
        <h2 className={cx("title")}>Thành tựu của chúng tôi</h2>
        <div className={cx("container-status-wrap")}>
          <div className={cx("stats")}>
            <div className={cx("stat")}>
              <h3>LƯỢT THI</h3>
              <p>7,110,140</p>
              <i className='fas fa-pen'></i>
            </div>
            <div className={cx("stat")}>
              <h3>THÍ SINH</h3>
              <p>1,818,464</p>
              <i className='fas fa-user'></i>
            </div>
            <div className={cx("stat")}>
              <h3>ĐỐI TÁC</h3>
              <p>35</p>
              <i className='fas fa-users'></i>
            </div>
            <div className={cx("stat")}>
              <h3>NGÂN HÀNG CÂU HỎI</h3>
              <p>4,735</p>
              <i className='fas fa-file-alt'></i>
            </div>
          </div>
        </div>
      </div>
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
              <li>
                Nhận đề, vào thi 04 kỹ năng theo đúng thứ tự: Nghe (47 phút) - Đọc (60 phút) - Viết (60 phút) - Nói (12 phút)
              </li>
              <li>Bấm Nộp bài khi kết thúc cả 04 kỹ năng</li>
              <li>Nhận ngay điểm thi và kết quả chi tiết phần thi trắc nghiệm, có thể đăng ký chấm thi tự luận</li>
            </ul>
          </div>
          <div className={cx("image-des")}>
            <img
              src='/src/assets/laptop.png'
              alt='Screenshot of the software on a mobile phone and a laptop'
              className={cx("screenshot")}
            />
          </div>
        </div>
      </div>

      <div className={cx("container-level")}>
        <h1>Ai cần thi chứng chỉ ngoại ngữ tiếng Anh VSTEP?</h1>
        <div className={cx("levels")}>
          <div className={cx("level")}>
            <h2>Bậc 2</h2>
            <ul>
              <li>
                <BiBadgeCheck />
                Giáo viên Mầm non
              </li>
              <li>
                <BiBadgeCheck />
                Giáo viên Tiểu học
              </li>
              <li>
                <BiBadgeCheck />
                Giáo viên THCS
              </li>
              <li>
                <BiBadgeCheck />
                Thi tuyển công chức, viên chức
              </li>
            </ul>
          </div>
          <div className={cx("level")}>
            <h2>Bậc 3</h2>
            <ul>
              <li>
                <BiBadgeCheck />
                Đầu vào, đầu ra Thạc sỹ, Nghiên cứu sinh
              </li>
              <li>
                <BiBadgeCheck />
                Đầu vào, đầu ra Sinh viên các trường ĐH, CĐ
              </li>
              <li>
                <BiBadgeCheck />
                Thi tuyển công chức, viên chức
              </li>
            </ul>
          </div>
          <div className={cx("level")}>
            <h2>Bậc 4</h2>
            <ul>
              <li>
                <BiBadgeCheck />
                Giáo viên tiếng Anh Tiểu học
              </li>
              <li>
                <BiBadgeCheck />
                Giáo viên tiếng Anh THCS
              </li>
              <li>
                <BiBadgeCheck />
                Đầu vào, đầu ra Thạc sỹ, Nghiên cứu sinh
              </li>
              <li>
                <BiBadgeCheck />
                Thi tuyển chuyên viên cao cấp
              </li>
            </ul>
          </div>
          <div className={cx("level")}>
            <h2>Bậc 5</h2>
            <ul>
              <li>
                <BiBadgeCheck />
                Giáo viên tiếng Anh THPT
              </li>
              <li>
                <BiBadgeCheck />
                Giảng viên tiếng Anh các trường ĐH, CĐ
              </li>
              <li>
                <BiBadgeCheck />
                Cán bộ chấm thi VSTEP
              </li>
            </ul>
          </div>
        </div>
        <p className={cx("note")}>*Và nhiều đối tượng khác theo yêu cầu của các đơn vị, tổ chức.</p>
      </div>

      <div className={cx("slider")}>
        <div
          className={cx("slides")}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <img key={index} src={slide} alt={`Slide ${index + 1}`} className={cx("slide")} />
          ))}
        </div>
        <button className={cx("prev")} onClick={handlePrev}>
          &#10094;
        </button>
        <button className={cx("next")} onClick={handleNext}>
          &#10095;
        </button>
      </div>

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
    </>
  );
};

export default HomePage;
