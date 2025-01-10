import ModalCustom from "@/components/Modal";
import { AppDispatch, RootState } from "@/stores";
import { FeedbackActions } from "@/stores/feedbackStore/feedbackReducer";
import { useDispatch, useSelector } from "react-redux";
import style from "./ModalShowFeedback.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const ModalShowFeedback = () => {
  const { openModalShowFeedback, currentFeedback } = useSelector((state: RootState) => state.feedbackStore);
  const dispatch: AppDispatch = useDispatch();
  const handleCloseModalShowFeedback = () => {
    dispatch(FeedbackActions.changeOpenModalShowFeedback(false));
  };

  return (
    <ModalCustom
      width={800}
      open={openModalShowFeedback}
      modalTitle={`Phản hồi từ ${currentFeedback?.fullName}`}
      onCancel={handleCloseModalShowFeedback}
      scrollBody={true}
    >
      <div className={cx("modal-show-feedback")}>
        <div className={cx("modal-show-item")}>
          <span className={cx("modal-show-item_title")}>Họ và tên:</span>
          <span className={cx("modal-show-item_content")}>{currentFeedback?.fullName}</span>
        </div>
        <div className={cx("modal-show-item")}>
          <span className={cx("modal-show-item_title")}>Email:</span>
          <span className={cx("modal-show-item_content")}>{currentFeedback?.email}</span>
        </div>
        <div className={cx("modal-show-item")}>
          <span className={cx("modal-show-item_title")}>Điện thoại:</span>
          <span className={cx("modal-show-item_content")}>{currentFeedback?.phoneNumber}</span>
        </div>
        <div className={cx("modal-show-item-feedback")}>
          <span className={cx("modal-show-item_title")}>Nội dung phản hồi:</span>
          <span className={cx("modal-show-item_content")}>"{currentFeedback?.feedback}"</span>
        </div>
      </div>
    </ModalCustom>
  );
};
export default ModalShowFeedback;
