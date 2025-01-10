import { Table, TableColumnsType } from "antd";
import { useDispatch, useSelector } from "react-redux";
import style from "./TableFeedback.module.scss";
import classNames from "classnames/bind";
import ButtonShow from "@/components/Button/ButtonShow";
import React, { useEffect, useState } from "react";
import { IFeedback } from "@/types/feedback/FeedbackTypes";
import { AppDispatch, RootState } from "@/stores";
import { FeedbackActions } from "@/stores/feedbackStore/feedbackReducer";
const cx = classNames.bind(style);
interface DataType extends IFeedback {
  key: React.Key;
}
const TableFeedback = () => {
  const { feedbacks, isLoading } = useSelector((state: RootState) => state.feedbackStore);
  const [data, setData] = useState<DataType[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const handleShowFeedback = (feedback: IFeedback) => {
    dispatch(FeedbackActions.changeCurrentFeedback(feedback));
    dispatch(FeedbackActions.changeOpenModalShowFeedback(true));
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      width: 20,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Họ và tên",
      width: 50,
      render: (_, record) => {
        return record.fullName ?? "Chưa cập nhật";
      },
    },
    {
      title: "Email",
      dataIndex: "examPeriod",
      key: "examPeriod",
      width: 50,
      render: (_, record) => {
        return record.email ?? "Chưa cập nhật";
      },
    },
    {
      title: "Điện thoại",
      dataIndex: "examPeriod",
      key: "examPeriod",
      width: 50,
      render: (_, record) => {
        return record.phoneNumber ?? "Chưa cập nhật";
      },
    },
    {
      title: "Nội dung phản hồi",
      dataIndex: "feedback",
      key: "feedback",
      width: 100,
      render: (_, record) => {
        return <div className={cx("feedback-content")}>{record.feedback}</div>;
      },
    },

    {
      key: "action",
      fixed: "right",
      align: "center",
      title: "Tác vụ",
      width: 30,
      render: (_, record) => {
        return (
          <div className={cx("actions", "flex", "justify-content-center")}>
            <ButtonShow onClick={() => handleShowFeedback(record)} />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (feedbacks) {
      setData(
        feedbacks.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        })
      );
    }
  }, [feedbacks]);
  return (
    <Table
      className='table-centered '
      loading={isLoading}
      columns={columns}
      key={"id"}
      virtual
      dataSource={data}
      scroll={{ x: 1300, y: 420 }}
      pagination={false}
    />
  );
};
export default TableFeedback;
