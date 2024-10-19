import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import style from "./ExamRoom.module.scss";
import classNames from "classnames/bind";
import { Carousel } from "antd";
import Examinfomation from "./carousels/ExamInfomation";
import ContestantInfomation from "./carousels/ContestantInfomation";
import TestDevice from "./carousels/TestDevice";
import React from "react";
import { CarouselRef } from "antd/es/carousel";
const cx = classNames.bind(style);
const ExamRoom = () => {
  const carouselRef = React.useRef<CarouselRef | null>(null);
  const handleClickBtnPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };
  const handleClickBtnNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  return (
    <div className={cx("exam-room-wrapper")}>
      <div className={cx("content")}>
        <button onClick={handleClickBtnPrev} className={cx("action-button", "btn-prev")}>
          <BiCaretLeft />
        </button>
        <button onClick={handleClickBtnNext} className={cx("action-button", "btn-next")}>
          <BiCaretRight />
        </button>
        <div className={cx("carousel-box", "custom-ant-carousel")}>
          <Carousel dots={false} ref={carouselRef} infinite={false} className='full-height'>
            <div className={cx("carousel-item")}>
              <TestDevice />
            </div>
            <div className={cx("carousel-item")}>
              <Examinfomation />
            </div>
            <div className={cx("carousel-item")}>
              <ContestantInfomation />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default ExamRoom;
