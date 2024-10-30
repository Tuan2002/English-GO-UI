import { Popconfirm, Tooltip } from "antd";
import TableRowButton from ".";
import { BiTrash } from "react-icons/bi";

interface ButtonDeleteProps {
  onClick: () => void;
  onConfirmDelete: () => void;
  confirmTitle?: string;
  isLoading?: boolean;
}

const ButtonDelete = ({
  onClick,
  onConfirmDelete,
  isLoading = false,
  confirmTitle = "Bạn có chắc chắn muốn xoá bản ghi này không",
}: ButtonDeleteProps) => {
  return (
    <Popconfirm
      onConfirm={onConfirmDelete}
      title='Confirm delete?'
      description={confirmTitle}
      okText='Confirm'
      cancelText='Cancel'
      placement='topRight'
      disabled={isLoading}
    >
      <Tooltip title='prompt text' trigger={"hover"} color='green'>
        <TableRowButton onClick={onClick} type='danger' icon={<BiTrash />} />
      </Tooltip>
    </Popconfirm>
  );
};
export default ButtonDelete;
