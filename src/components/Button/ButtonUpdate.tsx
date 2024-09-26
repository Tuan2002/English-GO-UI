import TableRowButton from ".";
import { BiEdit } from "react-icons/bi";

interface ButtonUpdateProps {
  onClick: () => void;
}

const ButtonUpdate = ({ onClick }: ButtonUpdateProps) => {
  return <TableRowButton onClick={onClick} type='warning' icon={<BiEdit />} />;
};
export default ButtonUpdate;
