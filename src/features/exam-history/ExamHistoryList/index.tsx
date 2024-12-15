import CardScroll from "@/components/CardScroll";
import style from "./ExamHistoryList.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { Button, Table, TableColumnsType } from "antd";
import { IExamScore } from "@/types/exam/ExamTypes";
import ButtonShow from "@/components/Button/ButtonShow";
import roundToHalfOrZero from "@/utils/Functions/RoundPointToHalfOrZero";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
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

const ExamHistoryList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { listMyExam, isLoading } = useSelector((state: RootState) => state.examStore);
  const navigate = useNavigate();

  const handleShowExamResult = (id: string) => {
    navigate(ROUTE_PATH.EXAM_RESULT.replace(":examId", id));
  };

  useEffect(() => {
    dispatch(ExamActions.getMyExams());
  }, [dispatch]);
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
        const skill = record.examSkillStatuses.find((item) => item.skillId === "listening");
        const score = (10 / (skill?.totalQuestion ?? 1)) * (skill?.score ?? 0);
        return (
          <div className=''>
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
        const skill = record.examSkillStatuses.find((item) => item.skillId === "reading");
        const score = (10 / (skill?.totalQuestion ?? 1)) * (skill?.score ?? 0);
        return (
          <div className=''>
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
        return (
          <div>
            <div>Chưa chấm điểm</div>
            <Button type='primary' size='small'>
              Đăng ký chấm
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
        return (
          <div>
            <div>Chưa chấm điểm</div>
            <Button type='primary' size='small'>
              Đăng ký chấm
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
    <CardScroll cardHeader='Lịch sử tham gia luyện thi'>
      <div className={cx("exam-history-list")}>
        <Table
          loading={isLoading}
          className='table-centered '
          columns={columns}
          key={"id"}
          virtual
          dataSource={listMyExam}
          scroll={{ x: 1100, y: 450 }}
          pagination={false}
        />
      </div>
    </CardScroll>
  );
};
export default ExamHistoryList;
