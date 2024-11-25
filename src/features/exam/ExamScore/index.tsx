import { Button, Col, Row } from "antd";
import sytle from "./ExamScore.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(sytle);
const ExamScore = () => {
  return (
    <div className={cx("exam-score-wrapper")}>
      <div className={cx("exam-score-box")}>
        <Row gutter={[20, 20]}>
          <Col span={11} xs={24} md={11}>
            <div className={cx("user-info", "info-box")}>
              <div className={cx("header")}>
                <h5>Thông tin tài khoản</h5>
              </div>
              <div className={cx("body")}>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Tài khoản: </span>
                  <span className={cx("value")}>admin</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Họ tên: </span>
                  <span className={cx("value")}>Nguyễn Tạ Quyền</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Loại tài khoản: </span>
                  <span className={cx("value")}>Miễn phí</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Lượt chấm điểm hiện có: </span>
                  <span className={cx("value")}>0</span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={13} xs={24} md={13}>
            <div className={cx("score-info", "info-box")}>
              <div className={cx("header")}>
                <h5>Thông tin bài thi</h5>
              </div>
              <div className={cx("body")}>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Mã lượt thi: </span>
                  <span className={cx("value")}>EXAMPRO-105129</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài nghe: </span>
                  <span className={cx("value")}>Nguyễn Tạ Quyền</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài đọc: </span>
                  <span className={cx("value")}>Miễn phí</span>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài viết: </span>
                  <div className={cx("value-box")}>
                    <Button type='default' danger size='small'>
                      Đăng kí chấm
                    </Button>
                    <span className={cx("value")}>Chưa chấm</span>
                  </div>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài nói: </span>
                  <div className={cx("value-box")}>
                    <Button type='default' danger size='small'>
                      Đăng kí chấm
                    </Button>
                    <span className={cx("value")}>Chưa chấm</span>
                  </div>
                </div>
                <div className={cx("info-item")}>
                  <span className={cx("title")}>Điểm bài thi: </span>
                  <span className={cx("value")}>0</span>
                </div>
                <div className={cx("info-item", "pt-10")}>
                  <Button>Quay lại</Button>
                  <Button className='flex-1' type='primary'>
                    Xem lại bài thi
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ExamScore;
