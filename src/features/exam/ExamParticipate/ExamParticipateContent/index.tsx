import { Col, Row } from "antd";
import style from "./ExamContent.module.scss";
import classNames from "classnames/bind";
import RightBox from "./RightBox";
import LeftBox from "./LeftBox";
const cx = classNames.bind(style);

const ExamParticipateContent = () => {
  return (
    <div className={cx("content-wrapper", "scrollbar")}>
      <Row className='full-height'>
        <Col className='full-height' lg={12}>
          <LeftBox />
        </Col>
        <Col className='full-height' lg={12}>
          <RightBox />
        </Col>
      </Row>
    </div>
  );
};
export default ExamParticipateContent;
