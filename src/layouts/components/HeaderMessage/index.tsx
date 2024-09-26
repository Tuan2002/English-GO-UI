import MenuWrapper from "@/components/MenuWrapper";
import NoData from "@/components/NoData";
import style from "./HeaderMessage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const HeaderMessage = () => {
  return (
    <MenuWrapper headerTitle='Tin nhắn'>
      <div className={cx("message-box")}>
        <NoData title='Chưa có tin nhắn nào' />
      </div>
    </MenuWrapper>
  );
};
export default HeaderMessage;
