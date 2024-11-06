import ButtonDelete from "@/components/Button/ButtonDelete";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import { Table, TableColumnsType } from "antd";
import style from "../ManageSchedule.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import dayjs from "dayjs";
import { ISchedule } from "@/types/schedule/ScheduleType";
import { ScheduleActions } from "@/stores/schedule/scheduleReducer";
const cx = classNames.bind(style);

const TableSchedule = () => {
  const columns: TableColumnsType<ISchedule> = [
    {
      title: "STT",
      width: 30,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Lịch thi",
      dataIndex: "examPeriod",
      key: "examPeriod",
      width: 100,
      render: (_, record) => {
        return record.examPeriod ?? "Chưa cập nhật";
      },
    },
    {
      title: "Thời gian đăng kí",
      dataIndex: "examPeriod",
      key: "examPeriod",
      width: 100,
      render: (_, record) => {
        return `${dayjs(record?.startDate ? record?.startDate : new Date()).format("DD/MM/YYYY")} - ${dayjs(
          record?.startDate ? record?.endDate : new Date()
        ).format("DD/MM/YYYY")}`;
      },
    },
    {
      title: "Thông tin mô tả",
      dataIndex: "description",
      key: "description",
      width: 100,
      render: (_, record) => {
        return record.description ?? "Chưa cập nhật";
      },
    },

    {
      title: "Tác vụ  ",
      key: "action",
      fixed: "right",
      align: "center",
      width: 50,
      render: (_, record) => {
        return (
          <div className={cx("actions", "flex", "justify-content-center")}>
            <ButtonUpdate onClick={() => handleUPdateOrganization(record)} />
            <ButtonDelete isLoading={isSubmitting} onConfirmDelete={() => onConfirmDelete(record.id)} onClick={() => {}} />
          </div>
        );
      },
    },
  ];

  const dispatch: AppDispatch = useDispatch();
  const { schedules, isSubmitting } = useSelector((state: RootState) => state.scheduleStore);

  const handleUPdateOrganization = (organization: ISchedule) => {
    const currentSchedule = schedules?.find((item) => item.id === organization.id);
    dispatch(ScheduleActions.changeSelectedSchedule(currentSchedule));
    dispatch(ScheduleActions.changeOpenModalSaveSchedule(true));
    dispatch(ScheduleActions.changeActionModal("update"));
  };

  const onConfirmDelete = (id: string) => {
    dispatch(ScheduleActions.deleteSchedule(id));
  };

  return (
    <Table
      className='table-centered '
      columns={columns}
      key={"id"}
      virtual
      dataSource={schedules}
      scroll={{ x: 1300, y: 400 }}
      pagination={false}
    />
  );
};

export default TableSchedule;
