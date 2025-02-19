import { Select } from "antd";
import style from "../ExamGradingRegister.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const ServiceTab = () => {
  return (
    <div className={cx("service-tab")}>
      <div className='d-flex justify-content-center align-items-center' style={{ height: "100px" }}>
        <Select size='large' className={cx("select-service")} placeholder='Chọn gói chấm bài bạn muốn sử dụng'>
          <Select.Option value='1'>Gói dịch vụ 1</Select.Option>
          <Select.Option value='2'>Gói dịch vụ 2</Select.Option>
          <Select.Option value='3'>Gói dịch vụ 3</Select.Option>
        </Select>
      </div>
      <div className={cx("service-infomation")}>
        <ul className={cx("service-infomation-list")}>
          <li className={cx("service-infomation-item")}>
            <span className={cx("title")}>Tên gói chấm bài:</span>
            <span className={cx("content")}>Gói dịch vụ 1</span>
          </li>
          <li className={cx("service-infomation-item")}>
            <span className={cx("title")}>Tên gói chấm bài:</span>
            <span className={cx("content")}>Gói dịch vụ 1</span>
          </li>
          <li className={cx("service-infomation-item")}>
            <span className={cx("title")}>Tên gói chấm bài:</span>
            <span className={cx("content")}>Gói dịch vụ 1</span>
          </li>
          <li className={cx("service-infomation-item")}>
            <span className={cx("title")}>Tên gói chấm bài:</span>
            <span className={cx("content")}>
              Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói
              dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch
              vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch
              vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói
              dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ
              1 Gói dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói
              dịch vụ 1 Gói dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ
              1 Gói dịch vụ 1 Gói dịch vụ 1 vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1 Gói dịch vụ 1
            </span>
          </li>
          <li className={cx("service-infomation-item")}>
            <span className={cx("title")}>Tên gói chấm bài:</span>
            <span className={cx("content")}>Gói dịch vụ 1</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ServiceTab;
