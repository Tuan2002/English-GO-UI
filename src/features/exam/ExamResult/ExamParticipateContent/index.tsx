import { Col, Row } from "antd";
import style from "./ExamContent.module.scss";
import classNames from "classnames/bind";
import RightBox from "./RightBox";
import LeftBox from "./LeftBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
const cx = classNames.bind(style);

const ExamScoreContent = () => {
  const { selectedLevel, selectedQuestion, resultOfQuestion } = useSelector((state: RootState) => state.examStore);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!selectedLevel || !selectedQuestion) {
      return;
    }
    const question = resultOfQuestion?.find((question) => question.levelId === selectedLevel);
    dispatch(ExamActions.changeQuestionResult(question));
  }, [selectedLevel, resultOfQuestion?.length, selectedQuestion, resultOfQuestion, dispatch]);
  return (
    // <div className={cx("content-wrapper", "scrollbar")}>
    //   <Row className='full-height'>
    //     <Col className='full-height' lg={12}>
    //       <LeftBox />
    //     </Col>
    //     <Col className='full-height' lg={12}>
    //       <RightBox />
    //     </Col>
    //   </Row>
    // </div>
    <div className={cx("content-wrapper", "scrollbar")}>
      <Row className='full-height'>
        <Col xs={0} lg={24} className='full-height'>
          <Row className='full-height' align={"stretch"}>
            <Col className='full-height' lg={12}>
              <LeftBox />
            </Col>
            <Col className='full-height' lg={12}>
              <RightBox />
            </Col>
          </Row>
        </Col>
        <Col className='' xs={24} lg={0}>
          <div className=''>
            <LeftBox isScroll={false} />
            <RightBox isScroll={false} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ExamScoreContent;
