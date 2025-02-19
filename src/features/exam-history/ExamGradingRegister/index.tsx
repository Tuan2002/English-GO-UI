import CardScroll from "@/components/CardScroll";
import style from "./ExamGradingRegister.module.scss";
import classNames from "classnames/bind";
import ButtonBackPage from "@/components/Button/ButtonBackPage";
import { useLocation } from "react-router-dom";
import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import GeneralTab from "./GeneralTab";
import ServiceTab from "./ServiceTab";
import ExaminerTab from "./ExaminerTab";
import ResultTab from "./ResultTab";
const cx = classNames.bind(style);
const ExamGradingRegister = () => {
  // const { examId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const skill = searchParams.get("skill");
  const [key, setKey] = useState("service");
  const onChange = (key: string) => {
    setKey(key);
  };
  const items: TabsProps["items"] = [
    // {
    //   key: "general",
    //   label: "Thông tin chung",
    //   children: <GeneralTab />,
    // },
    {
      key: "service",
      label: "Chọn gói dịch vụ",
      children: <ServiceTab />,
    },
    {
      key: "examiner",
      label: "Chọn người chấm",
      children: <ExaminerTab />,
    },
    {
      key: "result",
      label: "Kết quả đăng ký",
      children: <ResultTab />,
    },
  ];
  return (
    <CardScroll
      cardHeader={
        <div className='d-flex align-items-center'>
          <ButtonBackPage />
          <span className='ml-10'>Đăng ký chấm bài {skill === "writing" ? "bài viết" : "bài nói"}</span>
        </div>
      }
    >
      <div className={cx("exam-history-list")}>
        <Tabs size='small' className='full-height' defaultActiveKey='1' items={items} onChange={onChange} />
      </div>
    </CardScroll>
  );
};
export default ExamGradingRegister;
