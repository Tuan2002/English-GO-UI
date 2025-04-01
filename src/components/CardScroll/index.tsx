import { Spin } from "antd";
import classNames from "classnames/bind";
import ButtonBackPage from "../Button/ButtonBackPage";
import style from "./CardScroll.module.scss";
const cx = classNames.bind(style);
interface ICardScrollProps {
  cardHeader: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  showBackButton?: boolean;
  title?: string;
}
const CardScroll = ({ children, cardHeader, loading = false, showBackButton, title }: ICardScrollProps) => {
  return (
    <div className={cx("card-wrapper")}>
      <div className={cx("card-header")}>
        {showBackButton && <ButtonBackPage />}
        <div className={cx("card-title")}>{cardHeader ? cardHeader : title}</div>
      </div>
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
