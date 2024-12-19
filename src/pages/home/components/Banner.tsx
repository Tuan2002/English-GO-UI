import { Carousel } from "antd";
import classNames from "classnames/bind";
import style from "../HomePage.module.scss";
const cx = classNames.bind(style);
const Banner = () => {
  return (
    <div className={cx("banner-wrapper", "user-select-none")}>
      <Carousel autoplay arrows>
        <div className={cx("banner-item")}>
          <img className='full-width' src='/banner-3.svg' alt='' />
        </div>
        <div className={cx("banner-item")}>
          <img className='full-width' src='/banner-1.svg' alt='' />
        </div>
        <div className={cx("banner-item")}>
          <img className='full-width' src='/banner-2.svg' alt='' />
        </div>
      </Carousel>
    </div>
  );
};
export default Banner;
