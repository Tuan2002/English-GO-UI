import { Button } from "antd";
import style from "./Banner.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import { BiCheckCircle, BiRightArrowAlt } from "react-icons/bi";
const Banner = () => {
  return (
    <div className={cx("banner")}>
      <div className={cx("banner-2")}></div>
      <div className={cx("banner-content")}>
        <h4 className={cx("banner-title")}>
          Đăng tin tuyển dụng, <br /> Tìm kiếm ứng viên hiệu quả
        </h4>
        <div className={cx("banner-description")}>
          <div className={cx("desc-item")}>
            <span className={cx("icon")}>
              <BiCheckCircle />
            </span>
            <span className={cx("description")}>Đăng tin tuyển dụng miễn phí, tiếp cận hàng triệu ứng viên chất lượng</span>
          </div>
          <div className={cx("desc-item")}>
            <span className={cx("icon")}>
              <BiCheckCircle />
            </span>
            <span className={cx("description")}>
              Tìm kiếm ứng viên theo nhiều tiêu chí khác nhau, giúp tiết kiệm thời gian tuyển dụng
            </span>
          </div>
          <div className={cx("desc-item")}>
            <span className={cx("icon")}>
              <BiCheckCircle />
            </span>
            <span className={cx("description")}>Nguồn ứng viên khổng lồ từ nhiều ngành nghề khác nhau</span>
          </div>
        </div>
        <div className={cx("banner-action")}>
          <Button size='large'>Đăng kí nhà tuyển dụng</Button>
          <Button
            iconPosition='end'
            type='primary'
            size='large'
            icon={
              <span className='d-flex align-item-center font-size-2rem'>
                <BiRightArrowAlt />
              </span>
            }
          >
            Đăng tin tuyển dụng
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Banner;
