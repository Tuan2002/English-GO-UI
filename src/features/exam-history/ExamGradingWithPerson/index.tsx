import CardScroll from "@/components/CardScroll";
import { Tabs, TabsProps } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import GeneralTab from "./GeneralTab";
import ResultTab from "./ResultTab";
import style from "./ExamGradingWithPerson.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import { GradingActions } from "@/stores/gradingStore/gradingReducer";
const cx = classNames.bind(style);

const ExamGradingWithPerson = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const skill = searchParams.get("skill") as "writing" | "speaking";
  const { registeredGradeExamId } = useParams();
  const items: TabsProps["items"] = [
    {
      key: "general",
      label: "Thông tin chung",
      children: <GeneralTab />,
    },
    {
      key: "result",
      label: "Kết quả chấm bài",
      children: <ResultTab />,
    },
  ];
  useEffect(() => {
    dispatch(
      GradingActions.getGradingFeedbackWithPerson(
        registeredGradeExamId as string
      )
    );
  }, [dispatch, registeredGradeExamId]);
  return (
    <CardScroll
      showBackButton
      cardHeader={`Chấm điểm bài thi ${
        skill === "speaking" ? "nói" : "viết"
      } với người chấm`}
    >
      <div className={cx("exam-history-list")}>
        <Tabs
          size="small"
          className="full-height"
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </CardScroll>
  );
};

export default ExamGradingWithPerson;
