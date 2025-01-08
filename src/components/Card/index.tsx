import { Spin } from "antd";
import ButtonBackPage from "../Button/ButtonBackPage";
import style from "./Card.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
interface ICardProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  cardHeader?: React.ReactNode;
  cardFooter?: React.ReactNode;
  showFooter?: boolean;
  fullHeight?: boolean;
  showBackButton?: boolean;
  loading?: boolean;
}
const CardCustom = ({
  children,
  title = "Card Header",
  showHeader = true,
  cardHeader = null,
  fullHeight = false,
  showBackButton = false,
  loading = false,
}: ICardProps) => {
  return (
    <div className={cx("card-wrapper")}>
      {/* {showHeader && cardHeader ? cardHeader : <div className={cx("card-header")}>{title}</div>} */}
      {showHeader && (
        <div className={cx("card-header")}>
          {showBackButton && <ButtonBackPage />}
          <div className={cx("card-title")}>{cardHeader ? cardHeader : title}</div>
        </div>
      )}
      <div
        className={cx("card-body", "scrollbar", {
          "full-height": fullHeight,
          // scrollbar: fullHeight,
        })}
      >
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
export default CardCustom;
