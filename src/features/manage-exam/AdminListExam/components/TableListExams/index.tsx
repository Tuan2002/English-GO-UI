import ButtonShow from "@/components/Button/ButtonShow";
import ROUTE_PATH from "@/routes/routePath";
import { RootState } from "@/stores";
import { IUserExam } from "@/types/exam/ExamTypes";
import getFirstCharacterInName from "@/utils/Functions/getFirstCharacterInName";
import roundToHalfOrZero from "@/utils/Functions/RoundPointToHalfOrZero";
import { Avatar, Button, Table, TableColumnsType } from "antd";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./TableListExams.module.scss";
const cx = classNames.bind(style);
interface DataType extends IUserExam {
  key: React.Key;
}
interface ITableListExamsProps {
  role: "admin" | "examiner";
}
const TableListExams = ({ role }: ITableListExamsProps) => {
  const { listAllExams, isLoading } = useSelector((state: RootState) => state.examStore);
  const [data, setData] = React.useState<DataType[]>([]);
  const navigate = useNavigate();

  const handleShowExamResult = (id: string) => {
    navigate((role === "admin" ? ROUTE_PATH.ADMIN_EXAM_DETAIL : ROUTE_PATH.EXAMINER_EXAM_DETAIL).replace(":examId", id));
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      width: 30,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Thông tin người dùng",
      width: 100,
      render: (_, record) => {
        return (
          <div className={cx("user-box")}>
            <div className={cx("avatar")}>
              <Avatar src={record.user.avatar ? record.user.avatar : ""} size={40}>
                {record.user.fullName ? getFirstCharacterInName(record.user.fullName) : "Q"}
              </Avatar>
            </div>
            <div className={cx("info")}>
              <div className={cx("name")}>{record?.user.fullName}</div>
              <div className={cx("email")}>{record?.user.email}</div>
            </div>
          </div>
        );
      },
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
            <Button onClick={() => console.log(record)} type='primary' size='small'>
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
            <Button onClick={() => console.log(record)} type='primary' size='small'>
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
      title: "Tác vụ",
      width: 40,
      render: (_, record) => {
        return (
          <div className={cx("actions", "flex", "justify-content-center")}>
            <ButtonShow onClick={() => handleShowExamResult(record.id)} />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (listAllExams) {
      setData(
        listAllExams.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        })
      );
    }
  }, [listAllExams]);
  return (
    <Table
      className='table-centered '
      loading={isLoading}
      columns={columns}
      key={"id"}
      virtual
      dataSource={data}
      scroll={{ x: 1300, y: 400 }}
      pagination={false}
    />
  );
};
export default TableListExams;
