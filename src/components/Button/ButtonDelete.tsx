import { Popconfirm, Tooltip } from "antd";
import TableRowButton from ".";
import { BiTrash } from "react-icons/bi";

interface ButtonDeleteProps {
  onClick: () => void;
  onConfirmDelete: () => void;
}

const ButtonDelete = ({ onClick, onConfirmDelete }: ButtonDeleteProps) => {
  return (
    <Popconfirm
      onConfirm={onConfirmDelete}
      title='Xác nhận xóa'
      description='Bạn có chắc chắn muốn xoá bản ghi này không'
      okText='Xác nhận'
      cancelText='Huỷ'
      placement='topRight'
    >
      <Tooltip title='prompt text' trigger={"hover"} color='green'>
        <TableRowButton onClick={onClick} type='danger' icon={<BiTrash />} />
      </Tooltip>
    </Popconfirm>
  );
};
export default ButtonDelete;
