import MenuWrapper from "@/components/MenuWrapper";
import NoData from "@/components/NoData";
import style from "./HeaderNotify.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const HeaderNotify = () => {
  return (
    <MenuWrapper headerTitle='Thông báo'>
      <div className={cx("notify-box")}>
        <NoData title='Chưa có thông báo nào' />
      </div>
    </MenuWrapper>
  );
};
export default HeaderNotify;
