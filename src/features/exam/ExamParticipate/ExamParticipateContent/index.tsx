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
export default ExamParticipateContent;
