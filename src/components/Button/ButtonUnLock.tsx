import TableRowButton from ".";
import { BiLockOpen } from "react-icons/bi";

interface ButtonUnLockProps {
  onClick: () => void;
}

const ButtonUnLock = ({ onClick }: ButtonUnLockProps) => {
  return <TableRowButton onClick={onClick} icon={<BiLockOpen />} />;
};
export default ButtonUnLock;
