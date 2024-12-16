import { Col, Row } from "antd";
import style from "../HomePage.module.scss";
import classNames from "classnames/bind";
import { BiBadgeCheck } from "react-icons/bi";
import HeaderBox from "./HeaderBox";
const cx = classNames.bind(style);
const Achievement = () => {
  return (
    <div className={cx("achievement-wrapper")}>
      <HeaderBox title='Thành tựu của chúng tôi' isUpperCase />
      <div className={cx("container-status-wrap")}>
        <div className={cx("stats")}>
          <Row gutter={[20, 20]} align={"stretch"}>
            <Col span={12} xs={24} sm={12} lg={6}>
              <div className={cx("stat")}>
                <div className={cx("icon")}>
                  <BiBadgeCheck />
                </div>
                <h3 className={cx("quantity")}>10000+</h3>
                <span className={cx("description")}>Lượt tham gia luyện thi</span>
              </div>
            </Col>
            <Col span={12} xs={24} sm={12} lg={6}>
              <div className={cx("stat")}>
                <div className={cx("icon")}>
                  <BiBadgeCheck />
                </div>
                <h3 className={cx("quantity")}>700+</h3>
                <span className={cx("description")}>Người dùng hài lòng</span>
              </div>
            </Col>
            <Col span={12} xs={24} sm={12} lg={6}>
              <div className={cx("stat")}>
                <div className={cx("icon")}>
                  <BiBadgeCheck />
                </div>
                <h3 className={cx("quantity")}>30+</h3>
                <span className={cx("description")}>Đối tác chiến lược</span>
              </div>
            </Col>
            <Col span={12} xs={24} sm={12} lg={6}>
              <div className={cx("stat")}>
                <div className={cx("icon")}>
                  <BiBadgeCheck />
                </div>
                <h3 className={cx("quantity")}>30+</h3>
                <span className={cx("description")}>Đối tác chiến lược</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Achievement;
