import style from "./NoData.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface INodataProps {
  title?: string;
  content?: JSX.Element;
}
const NoData = ({ title = "No data", content }: INodataProps) => {
  return (
    <div className={cx("empty-box")}>
      <img className={cx("empty-image")} src='/empty.webp' alt='no-data' />
      {content ? content : <div className={cx("empty-content")}>{title}</div>}
    </div>
  );
};
export default NoData;
