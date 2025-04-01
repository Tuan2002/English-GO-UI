import HeaderBox from "@/components/HeaderBox";
import classNames from "classnames/bind";
import style from "./ExamScheduleLookup.module.scss";
const cx = classNames.bind(style);
const ExamScheduleLookup = () => {
  return (
    <div className={cx("test-score-lookup-wrapper")}>
      <HeaderBox
        title='Tra cứu lịch thi'
        isUpperCase={true}
        description={
          <div className={cx("description-box")}>
            <span>Tra cứu lịch thi chứng chỉ tiếng Anh VSTEP toàn quốc</span>
          </div>
        }
        maxWidth='100%'
      />
      <div className={cx("empty-result")}>
        <img className={cx("empty-image")} src='/empty-image.png' alt='empty-result' />
        <span className={cx("empty-text")}>Không có kết quả nào được tìm thấy!</span>
      </div>
    </div>
  );
};

export default ExamScheduleLookup;
