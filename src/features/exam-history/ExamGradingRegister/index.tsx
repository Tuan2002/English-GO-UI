import ButtonBackPage from "@/components/Button/ButtonBackPage";
import CardScroll from "@/components/CardScroll";
import { Col, Row, TabsProps } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./ExamGradingRegister.module.scss";
import ExaminerTab from "./ExaminerTab";
import ResultTab from "./ResultTab";
import ServiceTab from "./ServiceTab";
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
          <span className='ml-10'>Kết quả chấm bài {skill === "writing" ? "bài viết" : "bài nói"}</span>
        </div>
      }
    >
      {/* <div className={cx("exam-history-list")}>
        <Tabs size='small' className='full-height' defaultActiveKey='1' items={items} onChange={onChange} />
      </div> */}
      {/* <div className={cx("grade-register")}>
        <div className={cx("grade-item")}>
          <img className={cx("grade-item-image")} src='https://cdn-icons-png.flaticon.com/512/4712/4712139.png' />
          <div className={cx("grade-item-content")}>
            <h4 className={cx("grade-item-title")}>
              Đăng ký chấm bài <br /> Sử dụng trí tuệ nhân tạo
            </h4>
          </div>
        </div>
        <div className={cx("grade-item")}>
          <img
            className={cx("grade-item-image")}
            src='https://lh6.googleusercontent.com/proxy/dEeZD31HctQvn6J1GC9u2P60Xi5BbdDzlS6BIgLDr8uXIcBblzvhJNQCBEYpwk2E3LXlDhYmtt2FYuRQT3FIHuHcLKxPlHKF'
          />
          <div className={cx("grade-item-content")}>
            <h4 className={cx("grade-item-title")}>
              Đăng ký chấm bài <br /> Với giáo viên chấm bài
            </h4>
          </div>
        </div>
      </div> */}
      <div className={cx("grade-writing-with-ai")}>
        <Row gutter={[16, 16]} className='full-height'>
          <Col span={12}>
            <div className={cx("grade-leftbox")}>
              <div className={cx("grade-item", "scrollbar")}>
                <div className={cx("grade-question-box")}>
                  <h4 className={cx("title")}>Đề bài</h4>
                  <p className={cx("grade-question-description")}>
                    You have asked your closest friend Brianna to help look after your house and pet when you are on holiday. She
                    has written you an email asking for more information. Read this part of her email below.
                  </p>
                  <p className={cx("grade-question-content")}>
                    "Great to hear that you are going to visit Dubai! I'm sure you will have a wonderful time there. Don't worry,
                    I'll look after your house and your pet while you are away. I just want to know the time you leave for Dubai
                    and when you will be back. I don't a lot of experience looking after animals, so tell me how to care for your
                    pet. Also, are there any other household duties I am supposed to do?
                    <br />
                    Lots of love,
                    <br />
                    Brianna"
                  </p>
                  <p className={cx("grade-question-note")}>
                    Write a letter to respond to Brianna. You should write at least 120 words. Do not include your name. Your
                    response will be evaluated in terms of Task Fulfillment, Organization, Vocabulary and Grammar.
                  </p>
                </div>
              </div>
              <div className={cx("grade-item", "scrollbar")}>
                <div className={cx("grade-answer-box")}>
                  <h4 className={cx("title")}>Câu trả lời</h4>
                  <p className={cx("grade-answer-content")}>
                    Dear Brianna,
                    <br />
                    Thank you so much for agreeing to take care of my house and pet while I’m away! I really appreciate your help.
                    <br />I will be leaving for Dubai on July 10th and will return on July 25th. My flight is scheduled for early
                    in the morning, so I will leave the house the night before. I will make sure to leave a spare key for you
                    under the flower pot near the front door.
                    <br />
                    Regarding my pet, I have a small dog named Max. He is very friendly and loves to play. Please feed him twice a
                    day—once in the morning and once in the evening. His food is in the cupboard next to the fridge. Also, he
                    needs a short walk every evening around the block. If he gets bored, you can give him his favorite toy, which
                    is in the living room.
                    <br />
                    As for household duties, it would be great if you could water the plants every two days and collect any mail
                    from the mailbox. If you notice anything unusual, please let me know immediately.
                    <br />
                    Once again, I truly appreciate your help. Let me know if you have any questions!
                    <br />
                    Lots of love,
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={cx("grade-rightbox", "scrollbar")}>
              <h4 className={cx("title")}>Nhận xét và chấm điểm bài viết</h4>
              <div className={cx("grade-comment-item")}>
                <h5 className={cx("item-title")}>Nhận xét chung:</h5>
                <ul className={cx("list-comment")}>
                  <li className={cx("comment-item")}>- Bài viết có cấu trúc rõ ràng và dễ hiểu.</li>
                  <li className={cx("comment-item")}>- Sử dụng từ vựng phong phú và đa dạng.</li>
                  <li className={cx("comment-item")}>- Có sự liên kết tốt giữa các ý tưởng.</li>
                </ul>
                <div>
                  <h5> {"=>  "}Cho điểm: 92/100</h5>
                </div>
              </div>
              <div className={cx("grade-comment-item", "mt-10")}>
                <h5 className={cx("item-title")}>1. Về ngữ pháp:</h5>
                <ul className={cx("list-comment")}>
                  <li className={cx("comment-item")}>- Bài viết sử dụng đa dạng cấu trúc ngữ pháp chính xác, ít lỗi.</li>
                  <li className={cx("comment-item")}>- Các thì (thì hiện tại đơn, tương lai đơn) được sử dụng phù hợp..</li>
                  <li className={cx("comment-item")}>
                    - Một số câu có thể cải thiện để phức tạp hơn, ví dụ:
                    <br /> "I will make sure to leave a spare key for you under the flower pot near the front door." có thể viết
                    lại là "I will ensure that a spare key is left for you under the flower pot near the front door."
                  </li>
                </ul>
              </div>
              <div className={cx("grade-comment-item")}>
                <h5 className={cx("item-title")}>2. Về từ vựng:</h5>
                <ul className={cx("list-comment")}>
                  <li className={cx("comment-item")}>- Từ vựng phù hợp với trình độ B1, đủ để diễn đạt ý rõ ràng.</li>
                  <li className={cx("comment-item")}>
                    - Một số từ có thể thay thế để tự nhiên hơn:
                    <br /> "I really appreciate your help." → "I truly appreciate your assistance."
                    <br />
                    "His food is in the cupboard next to the fridge." → "You can find his food in the cabinet beside the fridge."
                  </li>
                  <li className={cx("comment-item")}>
                    - Có thể thêm một số cụm từ nâng cao như "make sure he stays hydrated", "keep an eye on the house" để bài viết
                    phong phú hơn.
                  </li>
                </ul>
              </div>
              <div className={cx("grade-comment-item")}>
                <h5 className={cx("item-title")}>1. Nhận xét chung:</h5>
                <ul className={cx("list-comment")}>
                  <li className={cx("comment-item")}>- Bài viết có cấu trúc rõ ràng và dễ hiểu.</li>
                  <li className={cx("comment-item")}>- Sử dụng từ vựng phong phú và đa dạng.</li>
                  <li className={cx("comment-item")}>- Có sự liên kết tốt giữa các ý tưởng.</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </CardScroll>
  );
};
export default ExamGradingRegister;
