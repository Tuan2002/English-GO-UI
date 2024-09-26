import TableRowButton from ".";
import { BiLock } from "react-icons/bi";

interface ButtonLockProps {
  onClick: () => void;
}

const ButtonLock = ({ onClick }: ButtonLockProps) => {
  return <TableRowButton type='info' onClick={onClick} icon={<BiLock />} />;
};
export default ButtonLock;
