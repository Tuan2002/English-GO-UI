import CardCustom from "@/components/Card";
import style from "./ManageSchedule.module.scss";
import classNames from "classnames/bind";
import { Input } from "antd";
import ActionBox from "./ActionBox";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "@/stores";
import TableSchedule from "./TableSchedule";
import ModalSaveSchedule from "./ModalSaveSchedule";
import { ScheduleActions } from "@/stores/schedule/scheduleReducer";
import { OrganizationActions } from "@/stores/organizationStore/organizationReducer";
const cx = classNames.bind(style);

const ManageSchedule = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(OrganizationActions.getAllOrganizations());
    dispatch(ScheduleActions.getAllSchedules());
  }, [dispatch]);
  return (
    <CardCustom title='Quản lí lịch thi' fullHeight>
      <div className={cx("manage-user-wrapper")}>
        <div className={cx("header")}>
          <div className={cx("filter")}>
            {/* <FilterBox /> */}
            <Input placeholder='Nhập thông tin để tìm kiếm' />
          </div>
          <div className={cx("actions")}>
            <ActionBox />
          </div>
        </div>
        <div className={cx("body")}>
          <div className={cx("table-user")}>
            <TableSchedule />
          </div>
        </div>
        <div className={cx("footer")}>
          <ModalSaveSchedule />
        </div>
      </div>
    </CardCustom>
  );
};

export default ManageSchedule;
