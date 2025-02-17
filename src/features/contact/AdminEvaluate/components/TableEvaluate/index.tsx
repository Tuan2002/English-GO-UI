import { RootState } from "@/stores";
import { Col, Row } from "antd";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import EvaluateItem from "../EvaluateItem";
import style from "./TableEvaluate.module.scss";
const cx = classNames.bind(style);

const TableEvaluate = () => {
  const { evaluates } = useSelector((state: RootState) => state.evaluateStore);
  return (
    <div className={cx("table-evaluate")}>
      <Row gutter={[16, 16]}>
        {evaluates.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={6}>
            <EvaluateItem evaluate={item} key={index} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default TableEvaluate;
