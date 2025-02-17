/* eslint-disable @typescript-eslint/no-explicit-any */
import ROUTE_PATH from "@/routes/routePath";
import { AppDispatch, RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { IExamSkillStatus } from "@/types/exam/ExamTypes";
import { Button, Col, Row } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import sytle from "./ExamScore.module.scss";
const cx = classNames.bind(sytle);

interface IScoreOfSkill {
  score: number;
  totalQuestion: number;
}
interface IScoreOfExam {
  listening: IScoreOfSkill;
  reading: IScoreOfSkill;
  writing: IScoreOfSkill;
  speaking: IScoreOfSkill;
}

const ExamScore = () => {
  const { examId } = useParams<{ examId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigate();
  const { currentExamScore } = useSelector((state: RootState) => state.examStore);
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const [examScore, setExamScore] = useState<IScoreOfExam | null>();

  const handleBackRoom = () => {
    navigation(ROUTE_PATH.EXAM);
  };
  const hanleReviewExam = () => {
    navigation(ROUTE_PATH.EXAM_RESULT.replace(":examId", examId ?? ""));
  };
  const handleRegisterMark = () => {
    toast.warning("Chức năng đang được phát triển");
  };

  useEffect(() => {
    if (!examId) {
      alert("Không tìm thấy mã bài thi");
      return;
    }
    const getScoreOfExam = async () => {
      dispatch(ExamActions.getExamScore(examId)).then((res: any) => {
        if (res.payload.success) {
          const scoreData = res?.payload?.data?.examSkillStatuses;
          const scoreOfExam: IScoreOfExam = {
            listening: {
              score: 0,
              totalQuestion: 0,
            },
            reading: {
              score: 0,
              totalQuestion: 0,
            },
            writing: {
              score: 0,
              totalQuestion: 0,
            },
            speaking: {
              score: 0,
              totalQuestion: 0,
            },
          };
          scoreData?.forEach((skill: IExamSkillStatus) => {
            const scoreOfSkill: IScoreOfSkill = {
              score: skill.score ?? 0,
              totalQuestion: skill.totalQuestion ?? 0,
            };
            scoreOfExam[skill?.skillId as keyof IScoreOfExam] = scoreOfSkill;
          });
          setExamScore(scoreOfExam);
        }
      });
    };
    getScoreOfExam();
  }, [dispatch, examId]);

  return (
    <div className={cx("exam-score-wrapper")}>
      <div className={cx("exam-score-box")}>
        <Row gutter={[20, 20]}>
          <Col span={11} xs={24} md={11}>
            <div className={cx("user-info", "info-box")}>
              <div className={cx("header")}>
                <h5>Thông tin tài khoản</h5>
              </div>
              <div className={cx("body")}>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Tài khoản: </span>
                  <span className={cx("value")}>{currentUser?.username}</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Họ tên: </span>
                  <span className={cx("value")}>{currentUser?.fullName}</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Loại tài khoản: </span>
                  <span className={cx("value")}>Miễn phí</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Lượt chấm điểm hiện có: </span>
                  <span className={cx("value")}>0</span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={13} xs={24} md={13}>
            <div className={cx("score-info", "info-box")}>
              <div className={cx("header")}>
                <h5>Thông tin bài thi</h5>
              </div>
              <div className={cx("body")}>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Mã lượt thi: </span>
                  <span className={cx("value")}>{currentExamScore?.examCode}</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài nghe: </span>
                  <span className={cx("value")}>
                    {examScore?.listening?.score} / {examScore?.listening?.totalQuestion}
                  </span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài đọc: </span>
                  <span className={cx("value")}>
                    {examScore?.reading?.score} / {examScore?.reading?.totalQuestion}
                  </span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài viết: </span>
                  <div className={cx("value-box")}>
                    <Button onClick={handleRegisterMark} type='default' danger size='small'>
                      Đăng kí chấm
                    </Button>
                    <span className={cx("value")}>Chưa chấm</span>
                  </div>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài nói: </span>
                  <div className={cx("value-box")}>
                    <Button onClick={handleRegisterMark} type='default' danger size='small'>
                      Đăng kí chấm
                    </Button>
                    <span className={cx("value")}>Chưa chấm</span>
                  </div>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài thi: </span>
                  <span className={cx("value")}>0</span>
                </div>
                <div className={cx("info-item", "pt-10")}>
                  <Button onClick={handleBackRoom}>Quay lại</Button>
                  <Button onClick={hanleReviewExam} className='flex-1' type='primary'>
                    Xem lại bài thi
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ExamScore;
