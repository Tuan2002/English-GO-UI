import { AppDispatch, RootState } from "@/stores";

import ButtonDelete from "@/components/Button/ButtonDelete";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import { PlanActions } from "@/stores/planStore/planReducer";
import { IPlanAttribute } from "@/types/plan/PlanTypes";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../ManageServiceAttribute.module.scss";
const cx = classNames.bind(style);

interface DataType extends IPlanAttribute {
  key: React.Key;
}

const TableGeneralPlanAttribute: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = React.useState<DataType[]>([]);
  const { listGeneralPlanAttributes } = useSelector((state: RootState) => state.planStore);

  const onConfirmDelete = (id: string) => {
    dispatch(PlanActions.deletePlanAttribute(id));
  };

  const handleUpdateUser = (attribute: IPlanAttribute) => {
    dispatch(PlanActions.setPlanAttributeData(attribute));
    dispatch(PlanActions.changeActionModal("update"));
    dispatch(PlanActions.changeOpenModalSaveServiceAttribute(true));
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      width: 20,
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Mã thuộc tính",
      dataIndex: "Name",
      key: "Name",
      width: 50,
      render: (_, record) => {
        return record.name ?? "Chưa cập nhật";
      },
    },
    {
      title: "Tên thuộc tính",
      dataIndex: "displayName",
      key: "displayName",
      width: 80,
      render: (_, record) => {
        return record.displayName ?? "Chưa cập nhật";
      },
    },
    {
      title: "Kiểu dữ liệu",
      dataIndex: "dataType",
      key: "dataType",
      width: 50,
      render: (_, record) => {
        return record.dataType ?? "Chưa cập nhật";
      },
    },

    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      align: "center",
      width: 50,
      render: (_, record) => {
        return (
          <div className={cx("actions", "d-flex", "justify-content-center", "gap-10")}>
            <ButtonUpdate onClick={() => handleUpdateUser(record)} />
            <ButtonDelete onConfirmDelete={() => onConfirmDelete(record.id)} onClick={() => {}} />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (listGeneralPlanAttributes) {
      setData(
        listGeneralPlanAttributes.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        })
      );
    }
  }, [listGeneralPlanAttributes]);
  return (
    <Table
      className='table-centered '
      columns={columns}
      key={"id"}
      virtual
      dataSource={data}
      scroll={{ x: 1000, y: 420 }}
      pagination={false}
    />
  );
};

export default TableGeneralPlanAttribute;
