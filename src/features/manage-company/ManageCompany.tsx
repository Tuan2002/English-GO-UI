import CardCustom from "@/components/Card";
import style from "./ManageCompany.module.scss";
import classNames from "classnames/bind";
import FilterBox from "./FilterBox";
import ActionBox from "./ActionBox";
// import TableUser from "./TableUser";
// import ModalSaveUser from "./ModalSaveUser";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import PaginationCustom from "@/components/Pagination";
import ListCompany from "./ListCompany";
import CompanyInfomationModal from "./Modal/CompanyInfomationModal";
import ApproveRegisterModal from "./Modal/ApproveRegisterModal";
import RejectRegisterModal from "./Modal/RejectRegisterModal";
const cx = classNames.bind(style);
const ManageCompany = () => {
  const { totalCompany, limit } = useSelector((state: RootState) => state.companyStore);
  return (
    <CardCustom title='Quản lý công ty' fullHeight>
      <div className={cx("manage-user-wrapper")}>
        <div className={cx("header")}>
          <div className={cx("filter")}>
            <FilterBox />
          </div>
          <div className={cx("actions")}>
            <ActionBox />
          </div>
        </div>
        <div className={cx("body")}>
          <div className={cx("table-user")}>
            <ListCompany />
          </div>
          <div className='flex justify-content-end'>
            <PaginationCustom total={totalCompany || 0} limit={limit} />
          </div>
        </div>
        <div className={cx("footer")}>
          <CompanyInfomationModal />
          <ApproveRegisterModal />
          <RejectRegisterModal />
        </div>
      </div>
    </CardCustom>
  );
};
export default ManageCompany;
