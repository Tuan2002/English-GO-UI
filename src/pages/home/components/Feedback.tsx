import style from "../HomePage.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
const cx = classNames.bind(style);
const Achievement = () => {
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
  );
};
export default Achievement;
