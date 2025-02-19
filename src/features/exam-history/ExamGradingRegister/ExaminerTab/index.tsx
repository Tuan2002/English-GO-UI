import { Checkbox, Col, Row } from "antd";
import style from "../ExamGradingRegister.module.scss";
import classNames from "classnames/bind";
import ExaminerItem from "./ExaminerItem";
const cx = classNames.bind(style);
const ExaminerTab = () => {
  return (
    <div className={cx("examiner-tab")}>
      <div className={cx("header")}>
        <Row justify={"space-between"} gutter={[0, 16]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={18}>
            <div className='font-weight-500'>Chọn người chấm bạn muốn đăng ký</div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={6}>
            <Checkbox>Chọn người chấm ngẫu nhiên</Checkbox>
          </Col>
        </Row>
      </div>
      <div className={cx("list-examiner")}>
        <Row gutter={[16, 16]}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
              <ExaminerItem />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default ExaminerTab;
