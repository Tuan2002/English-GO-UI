import CardCustom from "@/components/Card";
import style from "./CreateJob.module.scss";
import classNames from "classnames/bind";
import { Button } from "antd";
import { BiPlusCircle } from "react-icons/bi";
const cx = classNames.bind(style);

const CardHeader = () => {
  // const dispatch = useDispatch();
  const handleOpenModalUpdateCompany = () => {
    //   dispatch(CompanyActions.setOpenModalUpdateCompany(true));
  };
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <span>Đăng tin tuyển dụng</span>
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

const CreateJob = () => {
  return (
    <div className={cx("recruitment-wrapper")}>
      <CardCustom fullHeight cardHeader={<CardHeader />}>
        <div>create job</div>
      </CardCustom>
    </div>
  );
};
export default CreateJob;
