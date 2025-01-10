import { AppDispatch, RootState } from "@/stores";
import ModalCustom from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { IUserData } from "@/types/user/UserType";
import { UserActions } from "@/stores/userStore/userReducer";
import { Avatar, Button, Checkbox, Col, Input, Pagination, Row, Table, TableColumnsType } from "antd";
import style from "./ModalChooseUser.module.scss";
import classNames from "classnames/bind";
import getFirstCharacterInName from "@/utils/Functions/getFirstCharacterInName";
const cx = classNames.bind(style);

interface IModalChooseUserProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseUser?: (listUser: string[]) => void;
  selectedUsers?: string[];
}
interface DataType extends IUserData {
  key: React.Key;
}

const ModalChooseUser = ({ isOpen, onClose, selectedUsers = [], onChooseUser }: IModalChooseUserProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = React.useState<DataType[]>([]);
  const { listUser } = useSelector((state: RootState) => state.userStore);
  const { totalUser, limit } = useSelector((state: RootState) => state.userStore);
  const [page, setPage] = React.useState(1);
  const [listSelectedUser, setListSelectedUser] = React.useState<string[]>(selectedUsers);
  React.useEffect(() => {
    dispatch(UserActions.getAllUsers({ page: Number(page), limit: Number(limit) }));
  }, [dispatch, limit, page]);
  React.useEffect(() => {
    setListSelectedUser(selectedUsers);
  }, [isOpen]);
  const handleToggleCheckUser = (id: string) => {
    if (listSelectedUser.includes(id)) {
      setListSelectedUser(listSelectedUser.filter((item) => item !== id));
    } else {
      setListSelectedUser([...listSelectedUser, id]);
    }
  };
  const handleConfirmChooseUser = () => {
    onClose();
    if (onChooseUser) {
      onChooseUser(listSelectedUser);
    }
  };
  const columns: TableColumnsType<DataType> = [
    {
      width: 20,
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleToggleCheckUser(e.target.value)}
          value={record.id}
          checked={listSelectedUser?.includes(record.id)}
        />
      ),
      align: "center",
    },
    {
      title: "Thông tin người dùng",
      width: 100,
      render: (_, record) => {
        return (
          <div className={cx("user-box")}>
            <div className={cx("avatar")}>
              <Avatar src={record.avatar && record.avatar} size={40}>
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
  ];
  React.useEffect(() => {
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
    <ModalCustom
      onOK={handleConfirmChooseUser}
      scrollBody
      width={1000}
      open={isOpen}
      onCancel={onClose}
      modalTitle='Chọn người dùng'
    >
      <div className='d-flex flex-column full-height'>
        <div className='mb-10'>
          <Row>
            <Col span={24} sm={12} lg={8}>
              <div className='d-flex justify-content-between' style={{ gap: 10 }}>
                <Input placeholder='Tìm kiếm người dùng' />
                <Button type='primary'>Tìm kiếm</Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className='flex-1'>
          <Table
            className='table-centered'
            columns={columns}
            key={"id"}
            virtual
            dataSource={data}
            scroll={{ x: 1000, y: 400 }}
            pagination={false}
          />
        </div>
        <div className='d-flex justify-content-end mt-10'>
          <Pagination size='small' total={totalUser || 0} pageSize={limit} current={page} onChange={(page) => setPage(page)} />
        </div>
      </div>
    </ModalCustom>
  );
};
export default ModalChooseUser;
