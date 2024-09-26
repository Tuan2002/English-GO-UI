import TableRowButton from ".";
import { BiShow } from "react-icons/bi";

interface ButtonShowProps {
  onClick: () => void;
}

const ButtonShow = ({ onClick }: ButtonShowProps) => {
  return <TableRowButton type='success' onClick={onClick} icon={<BiShow />} />;
};
export default ButtonShow;
