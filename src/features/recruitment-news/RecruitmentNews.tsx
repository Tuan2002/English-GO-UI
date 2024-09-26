import CardCustom from "@/components/Card";
import style from "./RecruitmentNews.module.scss";
import classNames from "classnames/bind";
import { Button, Tabs } from "antd";
import ActiveNewsTab from "./tabs/ActiveNewsTab";
import PendingNewsTab from "./tabs/PendingNewsTab";
import PausingNewsTab from "./tabs/PausingNewsTab";
import ExpiredNewsTab from "./tabs/ExpiredNewsTab";
import FilterBox from "./FilterBox";
import { BiPlusCircle } from "react-icons/bi";
const cx = classNames.bind(style);

const CardHeader = () => {
  // const dispatch = useDispatch();
  const handleOpenModalUpdateCompany = () => {
    //   dispatch(CompanyActions.setOpenModalUpdateCompany(true));
  };
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <span>Tin tuyển dụng</span>
      <div>
        <Button
          icon={
            <div className='d-flex align-items-center justify-content-center'>
              <BiPlusCircle style={{ fontSize: "20px" }} />
            </div>
          }
          onClick={handleOpenModalUpdateCompany}
          type='primary'
        >
          Đăng tin mới
        </Button>
      </div>
    </div>
  );
};

const RecruitmentNews = () => {
  return (
    <div className={cx("recruitment-wrapper")}>
      <CardCustom fullHeight cardHeader={<CardHeader />}>
        <div className={cx("filter-box")}>
          <FilterBox />
        </div>
        <div className={cx("tabs-box")}>
          <Tabs
            // onChange={onChange}
            type='card'
            items={[
              { label: "Tin đang hiển thị", key: "1", children: <ActiveNewsTab /> },
              { label: "Tin đang chờ duyệt", key: "2", children: <PendingNewsTab /> },
              { label: "Tin đang tạm ngừng đăng", key: "3", children: <PausingNewsTab /> },
              { label: "Tin đã hết hạn", key: "4", children: <ExpiredNewsTab /> },
            ]}
          />
        </div>
      </CardCustom>
    </div>
  );
};
export default RecruitmentNews;
