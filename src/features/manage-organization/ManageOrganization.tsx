import CardCustom from "@/components/Card";
import style from "./ManageOrganization.module.scss";
import classNames from "classnames/bind";
import { Input } from "antd";
import ActionBox from "./ActionBox";
import TableOrganization from "./TableOrganization";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { OrganizationActions } from "@/stores/organizationStore/organizationReducer";
import { AppDispatch } from "@/stores";
import ModalSaveOrganization from "./ModalSaveOrganization";
const cx = classNames.bind(style);

const ManageOrganization = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(OrganizationActions.getAllOrganizations());
  }, [dispatch]);
  return (
    <CardCustom title='Quản lí đơn vị tổ chức thi' fullHeight>
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
            <TableOrganization />
          </div>
          {/* <div className='flex justify-content-end'>
            <PaginationCustom total={totalUser || 0} limit={limit} />
          </div> */}
        </div>
        <div className={cx("footer")}>
          <ModalSaveOrganization />
        </div>
      </div>
    </CardCustom>
  );
};

export default ManageOrganization;
