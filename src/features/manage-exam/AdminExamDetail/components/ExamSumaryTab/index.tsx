/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import style from "./ExamSumary.module.scss";
import classNames from "classnames/bind";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ExamActions } from "@/stores/examStore/examReducer";
import { IExamSkillStatus } from "@/types/exam/ExamTypes";
const cx = classNames.bind(style);

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

const ExamSumaryTab = () => {
  const { examId } = useParams<{ examId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { currentExamScore } = useSelector((state: RootState) => state.examStore);
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const [examScore, setExamScore] = useState<IScoreOfExam | null>();

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
        const payload = res.payload;
        if (payload.success) {
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
    <div className='d-flex justify-content-center'>
      <div className={cx("exam-score-box")}>
        <Row gutter={[20, 20]}>
          <Col span={11} xs={24} md={11}>
            <div className={cx("user-info", "info-box")}>
              <div className={cx("header")}>
                <h5>Thông tin thí sinh</h5>
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
                      Chấm bài
                    </Button>
                    <span className={cx("value")}>Chưa chấm</span>
                  </div>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài nói: </span>
                  <div className={cx("value-box")}>
                    <Button onClick={handleRegisterMark} type='default' danger size='small'>
                      Chấm bài
                    </Button>
                    <span className={cx("value")}>Chưa chấm</span>
                  </div>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài thi: </span>
                  <span className={cx("value")}>0</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ExamSumaryTab;
