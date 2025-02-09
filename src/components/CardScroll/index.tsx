import { Spin } from "antd";
import style from "./CardScroll.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
interface ICardScrollProps {
  cardHeader: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
}
const CardScroll = ({ children, cardHeader, loading = false }: ICardScrollProps) => {
  return (
    <div className={cx("card-wrapper")}>
      <div className={cx("card-header")}>{cardHeader}</div>
      <div className={cx("card-body", "scrollbar")}>
        {loading && (
          <div className={cx("spin-box")}>
            <Spin />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
export default CardScroll;
