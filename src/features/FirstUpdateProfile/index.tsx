import ModalCustom from "@/components/Modal";
import { AppDispatch, RootState } from "@/stores";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./FirstUpdateProfile.module.scss";
import classNames from "classnames/bind";
import { authAction } from "@/stores/authStore/authReducer";
import UpdateProfile from "@/components/UpdateProfile";

const cx = classNames.bind(style);

const FirstUpdateProfile = () => {
  const { currentUser, isOpenModalFirstUpdate, isSubmitting } = useSelector((state: RootState) => state.authStore);
  const dispatch: AppDispatch = useDispatch();

  const updateProfileRef = useRef<{ onOke: () => void } | null>(null);

  const onOke = () => {
    if (updateProfileRef.current) {
      updateProfileRef.current.onOke();
    }
  };

  useEffect(() => {
    if (currentUser?.id && !currentUser?.isUpdated) {
      dispatch(authAction.changeIsOpenModalFirstUpdate(true));
    }
  }, [currentUser?.id]);

  return (
    <ModalCustom
      confirmTitle='Cập nhật'
      maskClosable={false}
      showCloseButton={false}
      cancelTitle='Để sau'
      isLoading={isSubmitting}
      modalTitle='Cập nhật thông tin'
      width={500}
      scrollBody
      open={isOpenModalFirstUpdate}
      onOK={onOke}
      onCancel={() => dispatch(authAction.changeIsOpenModalFirstUpdate(false))}
    >
      <div className={cx("update-profile-wrapper")}>
        <div className={cx("header", "text-center")}>
          <h3 className={cx("title")}>Chào mừng bạn đến với English GO</h3>
          <p className={cx("description")}>Vui lòng cập nhật thông tin cá nhân của bạn để sử dụng hệ thống!</p>
        </div>
        <UpdateProfile ref={updateProfileRef} isDisabled={false} />
      </div>
    </ModalCustom>
  );
};

export default FirstUpdateProfile;
