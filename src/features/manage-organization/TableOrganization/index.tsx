import ButtonDelete from "@/components/Button/ButtonDelete";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import { Table, TableColumnsType } from "antd";
import style from "../ManageOrganization.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { IOrganization } from "@/types/organization/OrganizationType";
import dayjs from "dayjs";
import { OrganizationActions } from "@/stores/organizationStore/organizationReducer";
const cx = classNames.bind(style);

const TableOrganization = () => {
  const columns: TableColumnsType<IOrganization> = [
    {
      title: "STT",
      width: 30,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Tên tổ chức",
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (_, record) => {
        return record.name ?? "Chưa cập nhật";
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 50,
      render: (_, record) => {
        return record.createdAt ? dayjs(record.createdAt).format("DD/MM/YYYY").toString() : "Chưa cập nhật";
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
  const { organizations, isSubmitting } = useSelector((state: RootState) => state.organizationStore);

  const handleUPdateOrganization = (organization: IOrganization) => {
    const currentOrganization = organizations?.find((item) => item.id === organization.id);
    dispatch(OrganizationActions.changeSelectedOrganization(currentOrganization));
    dispatch(OrganizationActions.changeOpenModalSaveOrganization(true));
    dispatch(OrganizationActions.changeActionModal("update"));
  };

  const onConfirmDelete = (id: string) => {
    dispatch(OrganizationActions.deleteOrganization(id));
  };

  return (
    <Table
      className='table-centered '
      columns={columns}
      key={"id"}
      virtual
      dataSource={organizations}
      scroll={{ x: 1300, y: 400 }}
      pagination={false}
    />
  );
};

export default TableOrganization;
