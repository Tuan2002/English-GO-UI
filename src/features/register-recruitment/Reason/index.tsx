import { Col, Row } from "antd";
import style from "./Reason.module.scss";
import classNames from "classnames/bind";
import { BiCheckCircle } from "react-icons/bi";
const cx = classNames.bind(style);

const ReasonRegisterRecruitment = () => {
  return (
    <div className={cx("reason-wrapper")}>
      <div className={cx("reason-title")}>
        <h4>Dịch vụ tuyển dụng trên JOBVIET</h4>
      </div>
      <div className={cx("reason-content")}>
        <div className={cx("reason-item")}>
          <Row align={"middle"} justify={"center"}>
            <Col xs={24} sm={20} md={8} lg={6}>
              <div className={cx("box-image")}>
                <img className='full-width' src='/src/assets/register-recruitment-1.webp' alt='reason-1' />
              </div>
            </Col>
            <Col xs={24} sm={24} md={16} lg={12}>
              <div className={cx("box-content")}>
                <h4 className={cx("title")}>Đề xuất CV ứng viên</h4>
                <div className={cx("descriptions")}>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>
                      Đa dạng hóa nguồn CV ứng viên mà không cần mất công tìm kiếm ứng viên.
                    </span>
                  </div>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>Tiết kiệm thời gian tuyển dụng nhân sự.</span>
                  </div>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>Tỷ lệ ứng viên phù hợp lên đến 40%.</span>
                  </div>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>Dịch vụ có cam kết CV đang tìm kiếm công việc.</span>
                  </div>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>Dễ dàng kiểm duyệt và đăng tin trong 24h.</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={cx("reason-content")}>
        <div className={cx("reason-item")}>
          <Row align={"middle"} justify={"center"}>
            <Col xs={24} sm={24} md={16} lg={12}>
              <div className={cx("box-content")}>
                <h4 className={cx("title")}>Đăng tin tuyển dụng miễn phí</h4>
                <div className={cx("descriptions")}>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>Đăng tin tuyển dụng miễn phí và không giới hạn số lượng.</span>
                  </div>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>Đăng tin tuyển dụng dễ dàng, không quá 1 phút.</span>
                  </div>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>Nguồn ứng viên khổng lồ từ nhiều ngành nghề khác nhau</span>
                  </div>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>
                      Tiếp cận nguồn CV ứng viên khổng lồ, tìm kiếm ứng viên từ kho dữ liệu hơn 5 triệu hồ sơ.
                    </span>
                  </div>
                  <div className={cx("desc-item")}>
                    <span className={cx("icon")}>
                      <BiCheckCircle />
                    </span>
                    <span className={cx("description")}>Dễ dàng kiểm duyệt và đăng tin trong 24h.</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={20} md={8} lg={6}>
              <div className={cx("box-image")}>
                <img className='full-width' src='/src/assets/register-recruitment-2.webp' alt='reason-1' />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default ReasonRegisterRecruitment;
