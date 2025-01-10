import React, { useEffect } from "react";
import { Avatar, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "@/stores/userStore/userReducer";
import { IUserData } from "@/types/user/UserType";
import { AppDispatch, RootState } from "@/stores";
import style from "../ManageUser.module.scss";
import classNames from "classnames/bind";
import getFirstCharacterInName from "@/utils/Functions/getFirstCharacterInName";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import ButtonDelete from "@/components/Button/ButtonDelete";
import ButtonLock from "@/components/Button/ButtonLock";
import ButtonShow from "@/components/Button/ButtonShow";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(style);

interface DataType extends IUserData {
  key: React.Key;
}

const TableUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = React.useState<DataType[]>([]);
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") || "1", 10);
  const limit = parseInt(queryParams.get("limit") || "10", 10);
  const { listUser } = useSelector((state: RootState) => state.userStore);
  console.log("listUser", listUser);
  useEffect(() => {
    dispatch(UserActions.getAllUsers({ page: Number(page), limit: Number(limit) }));
  }, [dispatch, limit, page]);

  const onConfirmDelete = (id: string) => {
    dispatch(UserActions.deleteUser(id));
  };

  const handleUpdateUser = (user: IUserData) => {
    dispatch(UserActions.changeSelectedUser(user));
    dispatch(UserActions.openModalUpdateUser());
  };
  const formatDate = (isoString: string) => {
    try {
      if (!isoString) return "Ngày chưa cập nhật";
      const date = new Date(isoString);
      // Lấy các giá trị cần thiết
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const day = date.getDate();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      // Tạo chuỗi định dạng
      const formattedDate = `${hours}:${minutes} ngày ${day}/${month}/${year}`;
      return formattedDate;
    } catch {
      return "Ngày chưa cập nhật";
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      width: 30,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Thông tin người dùng",
      width: 100,
      render: (_, record) => {
        return (
          <div className={cx("user-box")}>
            <div className={cx("avatar")}>
              <Avatar src={record.avatar ? record.avatar : ""} size={40}>
                {record.fullName ? getFirstCharacterInName(record.fullName) : "Q"}
              </Avatar>
            </div>
            <div className={cx("info")}>
              <div className={cx("name")}>{record.fullName}</div>
              <div className={cx("email")}>{record.username}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
      render: (_, record) => {
        return record.email ?? "Chưa cập nhật";
      },
    },
    {
      title: "Phân quyền",
      dataIndex: "groupRole",
      key: "groupRole",
      width: 100,
      render: (_, record) => {
        return record.groupRole?.displayName;
      },
    },
    {
      title: "Lần đăng nhập cuối",
      dataIndex: "lastLogin",
      key: "lastLogin",
      width: 100,
      render: (_, record) => {
        return (
          <div>
            <span>{formatDate(record.lastLogin ?? "")}</span>
          </div>
        );
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
            <ButtonShow onClick={() => {}} />
            <ButtonLock onClick={() => {}} />
            <ButtonUpdate onClick={() => handleUpdateUser(record)} />
            <ButtonDelete onConfirmDelete={() => onConfirmDelete(record.id)} onClick={() => {}} />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (listUser) {
      setData(
        listUser.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        })
      );
    }
  }, [listUser]);
  return (
    <Table
      className='table-centered '
      columns={columns}
      key={"id"}
      virtual
      dataSource={data}
      scroll={{ x: 1300, y: 400 }}
      pagination={false}
    />
  );
};

export default TableUser;
