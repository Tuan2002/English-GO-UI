import TableRowButton from ".";
import { CiEdit } from "react-icons/ci";

interface ButtonRestoreProps {
  onClick: () => void;
}

const ButtonRestore = ({ onClick }: ButtonRestoreProps) => {
  return <TableRowButton onClick={onClick} type='warning' icon={<CiEdit />} />;
};
export default ButtonRestore;
