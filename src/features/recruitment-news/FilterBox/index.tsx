import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import style from "./FilterBox.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const FilterBox = () => {
  return (
    <div className={cx("filterbox-wrapper")}>
      <Row gutter={[15, 15]} align={"bottom"}>
        <Col span={5} xs={24} sm={12} md={12} lg={5}>
          <div>
            <span className='mb-5 d-block'>Nhập từ khoá</span>
            <Input className='full-width' placeholder='Nhập từ khoá tìm kiếm...' />
          </div>
        </Col>
        <Col span={5} xs={24} sm={12} md={12} lg={5}>
          <div>
            <span className='mb-5 d-block'>Tìm theo ngày</span>
            <Select
              variant='filled'
              className='full-width'
              defaultValue={"startTime"}
              options={[
                { value: "startTime", label: "Ngày đăng" },
                { value: "endTime", label: "Ngày hết hạn" },
              ]}
            />
          </div>
        </Col>
        <Col span={5} xs={24} sm={12} md={12} lg={5}>
          <div>
            <span className='mb-5 d-block'>Từ ngày</span>
            <DatePicker variant='filled' className='full-width' placeholder='Chọn ngày bắt đầu' format={"DD/MM/YYYY"} />
          </div>
        </Col>
        <Col span={5} xs={24} sm={12} md={12} lg={5}>
          <div>
            <span className='mb-5 d-block'>Đến ngày</span>
            <DatePicker variant='filled' className='full-width' placeholder='Chọn ngày kết thúc' format={"DD/MM/YYYY"} />
          </div>
        </Col>
        <Col span={4} xs={24} sm={24} md={24} lg={4}>
          <div className=''>
            <Button className='full-width' type='primary'>
              Tìm kiếm
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default FilterBox;
