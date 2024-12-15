import style from "./CardScroll.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
interface ICardScrollProps {
  cardHeader: React.ReactNode;
  children: React.ReactNode;
}
const CardScroll = ({ children, cardHeader }: ICardScrollProps) => {
  return (
    <div className={cx("card-wrapper")}>
      <div className={cx("card-header")}>{cardHeader}</div>
      <div className={cx("card-body", "scrollbar")}>{children}</div>
    </div>
  );
};
export default CardScroll;
