import React, { useEffect } from "react";
import { Avatar, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "@/stores/userStore/userReducer";
import { RootState } from "@/stores";
import style from "../ManageCompany.module.scss";
import classNames from "classnames/bind";
import getFirstCharacterInName from "@/utils/Functions/getFirstCharacterInName";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import ButtonDelete from "@/components/Button/ButtonDelete";
import ButtonLock from "@/components/Button/ButtonLock";
import ButtonShow from "@/components/Button/ButtonShow";
import { useLocation } from "react-router-dom";
import { CompanyActions } from "@/stores/companyStore/companyReducer";
import { ICompany } from "@/types/company/CompanyType";
import StatusChip from "@/components/StatusChip";
import { CompanyStatus } from "@/constants/CompanyStatus";
const cx = classNames.bind(style);

interface DataType extends ICompany {
  key: React.Key;
}

const ListCompany: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = React.useState<DataType[]>([]);
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") || "1", 10);
  const limit = parseInt(queryParams.get("limit") || "10", 10);
  const { listCompany } = useSelector((state: RootState) => state.companyStore);
  useEffect(() => {
    dispatch<any>(CompanyActions.getAllCompanyByManager({ page: Number(page), limit: Number(limit) }));
  }, [page]);

  const onConfirmDelete = (id: string) => {
    dispatch<any>(UserActions.deleteUser(id));
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      width: 20,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Thông tin công ty",
      width: 100,
      render: (_, record) => {
        return (
          <div className={cx("user-box")}>
            <div className={cx("avatar")}>
              <Avatar src={record.companyLogo ? record.companyLogo : ""} size={40}>
                {record.companyName ? getFirstCharacterInName(record.companyName) : "Q"}
              </Avatar>
            </div>
            <div className={cx("info")}>
              <div className={cx("name")}>{record.companyName}</div>
              <div className={cx("email")}>{record.companyEmail}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Mã số thuế",
      dataIndex: "taxCode",
      key: "taxCode",
      width: 50,
      render: (_, record) => {
        return record.taxCode ? record.taxCode?.toString().toUpperCase() : "Chưa cập nhật";
      },
    },
    {
      title: "Tỉnh thành làm việc",
      dataIndex: "province",
      key: "province",
      width: 50,
      align: "center",
      render: (_, record) => {
        return record.province.provinceName;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "province",
      key: "province",
      width: 50,
      align: "center",
      render: (_, record) => {
        return (
          <div className={cx("status")}>
            <StatusChip type={CompanyStatus[record.status].status} label={CompanyStatus[record.status].label} />
          </div>
        );
      },
    },
    {
      title: "Thông tin người đăng ký",
      dataIndex: "isActive",
      key: "isActive",
      width: 80,
      render: (_, record) => {
        return (
          <div className={cx("user-box")}>
            <div className={cx("avatar")}>
              <Avatar src={record.recruiter.avatar ? record.recruiter.avatar : ""} size={40}>
                {record.recruiter.fullName ? getFirstCharacterInName(record.recruiter.fullName) : "Q"}
              </Avatar>
            </div>
            <div className={cx("info")}>
              <div className={cx("name")}>{record.recruiter.fullName}</div>
              <div className={cx("email")}>{record.recruiter.email}</div>
            </div>
          </div>
        );
      },
    },

    {
      title: "Tác vụ  ",
      key: "action",
      fixed: "right",
      align: "center",
      width: 30,
      render: (_, record) => {
        return (
          <div className={cx("actions", "flex", "justify-content-center")}>
            <ButtonShow onClick={() => handleShowCompany(record.id)} />
            <ButtonDelete onConfirmDelete={() => onConfirmDelete(record.id)} onClick={() => {}} />
          </div>
        );
      },
    },
  ];
  const handleShowCompany = (id: string) => {
    dispatch(CompanyActions.setSelectedCompanyId(id));
    dispatch(CompanyActions.setOpenModalShowCompany(true));
    dispatch<any>(CompanyActions.getCompanyById(id));
  };
  useEffect(() => {
    if (listCompany) {
      setData(
        listCompany.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        })
      );
    }
  }, [listCompany]);
  return (
    <Table
      className='table-centered '
      columns={columns}
      key={"id"}
      virtual
      dataSource={data}
      scroll={{ x: 1500, y: 400 }}
      pagination={false}
    />
  );
};

export default ListCompany;
