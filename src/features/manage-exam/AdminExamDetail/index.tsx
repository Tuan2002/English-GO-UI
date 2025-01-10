import CardCustom from "@/components/Card";
import { Tabs, TabsProps } from "antd";
import ExamSumaryTab from "./components/ExamSumaryTab";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { ExamActions } from "@/stores/examStore/examReducer";
import { useParams } from "react-router-dom";
import ListeningAndReadingTab from "./components/ListeningAndReading";
import WritingAndSpeakingTab from "./components/WritingAndSpeaking";

const AdminExamDetail = () => {
  const [key, setKey] = useState("sumary");
  const dispatch: AppDispatch = useDispatch();
  const { examId } = useParams<{ examId: string }>();
  const { isLoading } = useSelector((state: RootState) => state.examStore);
  const onChange = (key: string) => {
    setKey(key);
  };
  useEffect(() => {
    if (key !== "sumary") {
      dispatch(ExamActions.getResultOfExam({ examId: examId as string, skillId: key }));
      return;
    }
  }, [dispatch, examId, key]);
  const items: TabsProps["items"] = [
    {
      key: "sumary",
      label: "Kết quả tổng hợp",
      children: <ExamSumaryTab />,
    },
    {
      key: "listening",
      label: "Kỹ năng nghe",
      children: <ListeningAndReadingTab />,
    },
    {
      key: "reading",
      label: "Kỹ năng đọc",
      children: <ListeningAndReadingTab />,
    },
    {
      key: "writing",
      label: "Kỹ năng viết",
      children: <WritingAndSpeakingTab />,
    },
    {
      key: "speaking",
      label: "Kỹ năng nói",
      children: <WritingAndSpeakingTab />,
    },
  ];
  return (
    <CardCustom loading={isLoading} showBackButton title='Chi tiết bài thi' fullHeight>
      <Tabs className='full-height' defaultActiveKey='1' items={items} onChange={onChange} />
    </CardCustom>
  );
};
export default AdminExamDetail;
