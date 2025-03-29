import { BiPlusMedical } from "react-icons/bi";
import TableRowButton from ".";

interface ButtonAddNewProps {
  onClick: () => void;
}

const ButtonAddNew = ({ onClick }: ButtonAddNewProps) => {
  return <TableRowButton type='info' onClick={onClick} icon={<BiPlusMedical />} />;
};
export default ButtonAddNew;
