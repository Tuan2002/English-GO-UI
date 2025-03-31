import ROUTE_PATH from "@/routes/routePath";
import { RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { Button } from "antd";
import classNames from "classnames/bind";
import { BiHeadphone } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./HomeHeader.module.scss";
const cx = classNames.bind(style);

const HomeHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSubmitting } = useSelector((state: RootState) => state.examStore);
  const gotoExamRoom = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(ExamActions.participateExam()).then((res: any) => {
      if (res.payload.success) {
        navigate(ROUTE_PATH.EXAM_ROOM);
      }
      if (res.payload.status === 401) {
        toast.error("Vui lòng đăng nhập trước khi tham gia thi!");
        navigate(ROUTE_PATH.LOGIN);
      }
    });
  };
  const goToExamHistory = () => {
    navigate(ROUTE_PATH.EXAM_HISTORY_LIST);
  };
  return (
    <div className={cx("exam-page-wrapper")}>
      <div className={cx("bg-box")}>
        <div className={cx("content-box")}>
          <img src='/logo-full.png' className={cx("logo")} alt='exam' />
          <div className={cx("panda-2")}></div>
          <div className={cx("title")}>
            <h5 className={cx("text-title", "text-title-shadow")}>
              Nền tảng thi thử <br /> tiếng anh B1 miễn phí
            </h5>
            <h5 className={cx("text-title")}>
              Nền tảng thi thử <br /> tiếng anh B1 miễn phí
            </h5>
          </div>
          <div className={cx("actions")}>
            <Button loading={isSubmitting} onClick={gotoExamRoom} type='primary' className={cx("btn-start")}>
              Vào thi ngay
              <span className={cx("icon")}>
                <BiHeadphone />
              </span>
            </Button>
            <Button onClick={goToExamHistory} type='primary' className={cx("btn-schedule")}>
              Lịch sử luyện thi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeHeader;
