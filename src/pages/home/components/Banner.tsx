import { Carousel } from "antd";
import classNames from "classnames/bind";
import style from "../HomePage.module.scss";
const cx = classNames.bind(style);
const Banner = () => {
  return (
    <div className={cx("banner-wrapper", "user-select-none")}>
      <Carousel autoplay arrows>
        <div className={cx("banner-item")}>
          <img className='full-width' src='/banner_3.jpg' alt='' />
        </div>
        <div className={cx("banner-item")}>
          <img className='full-width' src='/banner_1.jpg' alt='' />
        </div>
        <div className={cx("banner-item")}>
          <img className='full-width' src='/banner_2.jpg' alt='' />
        </div>
      </Carousel>
    </div>
  );
};
export default Banner;
