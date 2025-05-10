import ButtonShow from "@/components/Button/ButtonShow";
import { RegisterGradeStatus, RegisterGradeStatusColors } from "@/constants/RegisterGradeStatus";
import ROUTE_PATH from "@/routes/routePath";
import { RootState } from "@/stores";
import { IRegisteredGradingExam } from "@/types/gradingFeedback/GradingFeedbackType";
import getFirstCharacterInName from "@/utils/Functions/getFirstCharacterInName";
import { Avatar, Table, TableColumnsType } from "antd";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./TableListRegisteredExams.module.scss";
const cx = classNames.bind(style);
interface DataType extends IRegisteredGradingExam {
  key: React.Key;
}
interface ITableListRegisteredExamsProps {
  role: "admin" | "examiner";
}
const TableListRegisteredExams = ({ role }: ITableListRegisteredExamsProps) => {
  const { registeredGradingExams, loading } = useSelector((state: RootState) => state.gradingStore);
  const [data, setData] = React.useState<DataType[]>([]);
  const navigate = useNavigate();

  const handleGradeExam = (id: string, skill: string) => {
    navigate(
      (role === "admin" ? ROUTE_PATH.ADMIN_GRADE_EXAM : ROUTE_PATH.EXAMINER_GRADE_EXAM).replace(":registeredGradeExamId", id) +
        "?skill=" +
        skill
    );
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      key: "index",
      width: 30,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Thông tin thí sinh",
      width: 100,
      render: (_, record) => {
        return (
          <div className={cx("user-box")}>
            <div className={cx("avatar")}>
              <Avatar src={record.contestant.avatar ? record.contestant.avatar : ""} size={40}>
                {record.contestant.fullName ? getFirstCharacterInName(record.contestant.fullName) : "Q"}
              </Avatar>
            </div>
            <div className={cx("info")}>
              <div className={cx("name")}>{record?.contestant.fullName}</div>
              <div className={cx("email")}>{record?.contestant.email}</div>
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
        return record.exam.examCode ?? "Chưa cập nhật";
      },
      className: cx("exam-code"),
      align: "center",
    },

    {
      title: "Kĩ năng",
      width: 70,
      align: "center",
      render: (_, record) => {
        return (
          <div className={cx("skill-box")}>
            {record.skillId === "speaking" ? (
              <span className={cx("speaking-skill")}>Speaking</span>
            ) : (
              <span className={cx("writing-skill")}>Writing</span>
            )}
          </div>
        );
      },
    },

    {
      title: "Trạng thái",
      width: 70,
      align: "center",
      render: (_, record) => {
        return (
          <div className={cx("status-box")}>
            <div className={cx("status")}>
              <span className={cx("status-point")} style={{ background: RegisterGradeStatusColors[record.status] }}></span>
              <span className={cx("status-text")} style={{ color: RegisterGradeStatusColors[record.status] }}>
                {RegisterGradeStatus[record.status]}
              </span>
            </div>
          </div>
        );
      },
    },

    {
      key: "action",
      align: "center",
      title: "Tác vụ",
      width: 40,
      render: (_, record) => {
        return (
          <div className={cx("actions", "flex", "justify-content-center")}>
            <ButtonShow onClick={() => handleGradeExam(record.id, record.skillId)} />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (registeredGradingExams) {
      setData(
        registeredGradingExams.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        })
      );
    }
  }, [registeredGradingExams]);
  return (
    <Table
      className='table-centered table-registered-exams'
      loading={loading}
      columns={columns}
      key={"id"}
      virtual
      dataSource={data}
      scroll={{ x: 1000, y: 400 }}
      rowHoverable={true}
      rowClassName={(item) => cx("table-row", `bg-${item.status}`)}
      pagination={false}
    />
  );
};
export default TableListRegisteredExams;
