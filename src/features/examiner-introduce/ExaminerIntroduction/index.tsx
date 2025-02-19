import CardCustom from "@/components/Card";
import ROUTE_PATH from "@/routes/routePath";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import style from "./ExaminerIntroduction.module.scss";
import classNames from "classnames/bind";
import Uploadimage from "@/components/UploadImage";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import HTMLDisplay from "@/components/HtmlDisplay";
const cx = classNames.bind(style);
const ExaminerIntroduction = () => {
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const { myExaminerIntroduction } = useSelector((state: RootState) => state.examinerIntroductionStore);
  const navigate = useNavigate();
  const handleGoToUpdatePage = () => {
    navigate(ROUTE_PATH.EXAMINER_UPDATE_INTRODUCTION);
  };
  return (
    <CardCustom
      title='Thông tin giới thiệu'
      cardHeader={
        <div className='d-flex justify-content-between align-items-center'>
          <span>Thông tin giới thiệu</span>
          <Button type='primary' onClick={handleGoToUpdatePage}>
            Cập nhật
          </Button>
        </div>
      }
      fullHeight
    >
      <div className={cx("update-examiner-introduction")}>
        <div className={cx("update-examiner-introduction-box")}>
          <div className={cx("header-box")}>
            <div className={cx("avatar")}>
              <Uploadimage disabled defaultImage={currentUser?.avatar} type='avatar' />
            </div>
            <Uploadimage disabled defaultImage={myExaminerIntroduction?.banner} type='cover' />
            <span className={cx("fullname")}>Nguyễn Tạ Quyền</span>
          </div>
          <div className={cx("body-box")}>
            <div className={cx("description")}>
              <p>
                <span className={cx("space")}></span>"{myExaminerIntroduction?.description}"
              </p>
            </div>
            <div className={cx("introduction-item")}>
              <span className={cx("title")}>Email:</span>
              <span>{currentUser?.email}</span>
            </div>
            <div className={cx("introduction-item")}>
              <span className={cx("title")}>Tên tài khoản:</span>
              <span>{currentUser?.username}</span>
            </div>
            <div className={cx("introduction-item")}>
              <span className={cx("title")}>Ngày sinh:</span>
              <span>{currentUser?.birthday}</span>
            </div>
            <div className={cx("introduction-item")}>
              <span className={cx("title")}>Điện thoại:</span>
              <span>{currentUser?.phoneNumber}</span>
            </div>
            <div className={cx("introduction-item")}>
              <span className={cx("title")}>Đơn vị công tác:</span>
              <span>{myExaminerIntroduction?.workPlace}</span>
            </div>
            <div className={cx("introduction-item")}>
              <span className={cx("title")}>Địa chỉ công tác:</span>
              <span>{myExaminerIntroduction?.workAddress}</span>
            </div>
          </div>
          <div className={cx("introduction")}>
            <HTMLDisplay htmlContent={myExaminerIntroduction?.introduction ?? ""} />
          </div>
        </div>
      </div>
    </CardCustom>
  );
};
export default ExaminerIntroduction;
