import ButtonDelete from "@/components/Button/ButtonDelete";
import ButtonUpdate from "@/components/Button/ButtonUpdate";
import { IPlanAttribute } from "@/types/plan/PlanTypes";
import classNames from "classnames/bind";
import style from "./ModalSaveServiceType.module.scss";
const cx = classNames.bind(style);
interface AttributeItemProps {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  attribute: IPlanAttribute;
  index: number;
}
const AttributeItem = ({ onDelete, onEdit, attribute, index }: AttributeItemProps) => {
  const handleConfirmDelete = () => {
    onDelete(attribute.id);
  };
  const handleEdit = () => {
    onEdit(attribute.id);
  };
  return (
    <div className={cx("attribute-item")}>
      <span className={cx("order")}>{index}</span>
      <div className={cx("body")}>
        <h5 className={cx("body-title")}>Tên dịch vụ</h5>
        <div className={cx("body-content")}>
          <div className={cx("item")}>
            <span className={cx("info-title")}>Mã thuộc tính:</span>
            <span className={cx("info-content")}>{attribute.name}</span>
          </div>
          <div className={cx("item")}>
            <span className={cx("info-title")}>Kiểu dữ liệu:</span>
            <span className={cx("info-content")}>{attribute.dataType}</span>
          </div>
        </div>
      </div>
      <div className={cx("actions")}>
        <ButtonUpdate onClick={handleEdit} />
        <ButtonDelete onConfirmDelete={handleConfirmDelete} onClick={() => {}} />
      </div>
    </div>
  );
};
export default AttributeItem;
