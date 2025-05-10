import ButtonShow from "@/components/Button/ButtonShow";
import CardScroll from "@/components/CardScroll";
import RegisterGradingExam, {
  RegisterGradingExamRef,
} from "@/features/RegisterGradingExam";
import ROUTE_PATH from "@/routes/routePath";
import { AppDispatch, RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { IExamScore } from "@/types/exam/ExamTypes";
import roundToHalfOrZero from "@/utils/Functions/RoundPointToHalfOrZero";
import { Button, Table, TableColumnsType } from "antd";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./ExamHistoryList.module.scss";
import EXAM_SKILLS from "@/constants/ExamSkills";
import {
  ERegisterGradeStatus,
  RegisterGradeStatus,
} from "@/constants/RegisterGradeStatus";
const cx = classNames.bind(style);

const ExamHistoryList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { listMyExam, isLoading } = useSelector(
    (state: RootState) => state.examStore
  );
  const navigate = useNavigate();
  const registerGradingExamRef = useRef<RegisterGradingExamRef | null>(null);

  const handleShowExamResult = (id: string) => {
    navigate(ROUTE_PATH.EXAM_RESULT.replace(":examId", id));
  };

  useEffect(() => {
    dispatch(ExamActions.getMyExams());
  }, [dispatch]);
  console.log("listMyExam", listMyExam);

  const columns: TableColumnsType<IExamScore> = [
    {
      title: "STT",
      width: 30,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Mã bài thi",
      dataIndex: "examPeriod",
      key: "examPeriod",
      width: 70,
      render: (_, record) => {
        return record.examCode ?? "Chưa cập nhật";
      },
      align: "center",
    },
    {
      title: "Điểm bài nghe",
      dataIndex: "listeningScore",
      key: "listeningScore",
      width: 70,
      align: "center",
      render: (_, record) => {
        const skill = record.examSkillStatuses?.find(
          (item) => item.skillId === "listening"
        );
        const score = (10 / (skill?.totalQuestion ?? 1)) * (skill?.score ?? 0);
        return (
          <div className="">
            <div>
              {skill?.score} / {skill?.totalQuestion} câu
            </div>
            <div>{roundToHalfOrZero(score)} / 10 điểm</div>
          </div>
        );
      },
    },
    {
      title: "Điểm bài đọc",
      dataIndex: "readingScore",
      key: "readingScore",
      align: "center",
      width: 70,
      render: (_, record) => {
        const skill = record.examSkillStatuses?.find(
          (item) => item.skillId === "reading"
        );
        const score = (10 / (skill?.totalQuestion ?? 1)) * (skill?.score ?? 0);
        return (
          <div className="">
            <div>
              {skill?.score} / {skill?.totalQuestion} câu
            </div>
            <div>{roundToHalfOrZero(score)} / 10 điểm</div>
          </div>
        );
      },
    },
    {
      title: "Điểm bài viết",
      dataIndex: "writingScore",
      key: "writingScore",
      width: 70,
      align: "center",
      render: (_, record) => {
        const registerGraded = record.registerGradeExams?.find(
          (item) => item.skillId === EXAM_SKILLS.WRITING
        );
        if (!registerGraded) {
          return (
            <div>
              <div>Chưa chấm điểm</div>
              <Button
                onClick={() =>
                  registerGradingExamRef.current?.handleRegisterGradingExam(
                    record.id,
                    EXAM_SKILLS.WRITING
                  )
                }
                type="primary"
                size="small"
                className="mt-10"
              >
                Đăng ký chấm
              </Button>
            </div>
          );
        }
        const skill = record?.examSkillStatuses?.find(
          (item) => item.skillId === EXAM_SKILLS.WRITING
        );
        return (
          <div>
            <div>
              {registerGraded?.status !== ERegisterGradeStatus.GRADED
                ? RegisterGradeStatus[
                    registerGraded?.status ?? ERegisterGradeStatus.REGISTERED
                  ]
                : skill?.score}
            </div>
            <Button
              onClick={() =>
                registerGradingExamRef.current?.handleRegisterGradingExam(
                  record.id,
                  EXAM_SKILLS.WRITING
                )
              }
              type="primary"
              size="small"
              className="mt-10"
            >
              Xem kết quả
            </Button>
          </div>
        );
      },
    },
    {
      title: "Điểm bài nói",
      dataIndex: "speakingScore",
      key: "speakingScore",
      width: 70,
      align: "center",
      render: (_, record) => {
        const registerGraded = record.registerGradeExams?.find(
          (item) => item.skillId === EXAM_SKILLS.SPEAKING
        );
        if (!registerGraded) {
          return (
            <div>
              <div>Chưa chấm điểm</div>
              <Button
                onClick={() =>
                  registerGradingExamRef.current?.handleRegisterGradingExam(
                    record.id,
                    EXAM_SKILLS.SPEAKING
                  )
                }
                type="primary"
                size="small"
                className="mt-10"
              >
                Đăng ký chấm
              </Button>
            </div>
          );
        }
        const skill = record?.examSkillStatuses?.find(
          (item) => item.skillId === EXAM_SKILLS.SPEAKING
        );
        return (
          <div>
            <div>
              {registerGraded?.status !== ERegisterGradeStatus.GRADED
                ? RegisterGradeStatus[
                    registerGraded?.status ?? ERegisterGradeStatus.REGISTERED
                  ]
                : skill?.score}
            </div>
            <Button
              onClick={() =>
                registerGradingExamRef.current?.handleRegisterGradingExam(
                  record.id,
                  EXAM_SKILLS.SPEAKING
                )
              }
              type="primary"
              size="small"
              className="mt-10"
            >
              Xem kết quả
            </Button>
          </div>
        );
      },
    },
    {
      key: "action",
      fixed: "right",
      align: "center",
      width: 20,
      render: (_, record) => {
        return (
          <div className={cx("actions", "flex", "justify-content-center")}>
            <ButtonShow onClick={() => handleShowExamResult(record.id)} />
          </div>
        );
      },
    },
  ];
  return (
    <CardScroll cardHeader="Lịch sử tham gia luyện thi">
      <div className={cx("exam-history-list")}>
        <Table
          rowKey="id"
          loading={isLoading}
          className="table-centered "
          columns={columns}
          key={"id"}
          virtual
          dataSource={listMyExam}
          scroll={{ x: 1100, y: 450 }}
          pagination={false}
        />
      </div>
      <RegisterGradingExam ref={registerGradingExamRef} />
    </CardScroll>
  );
};
export default ExamHistoryList;
