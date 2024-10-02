import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ISkill } from "@/types/skill/SkillType";
import style from "../ListSkill.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SkillActions } from "@/stores/skillStore/skillReducer";
const cx = classNames.bind(style);
interface ISkillItemProps {
  skill: ISkill;
}
const SkillItem = ({ skill }: ISkillItemProps) => {
  const dispatch = useDispatch();
  const handleShowSkill = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(SkillActions.changeSelectedSkill(skill));
    dispatch(SkillActions.changeOpenModalSkillInfomation(true));
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <div className={cx("skill-item-wrapper")}>
      <Link
        to={skill.id}
        className={cx("skill-item-box")}
        style={{ backgroundImage: `url(${skill.image && skill.image.trim() ? skill.image : "/src/assets/empty.webp"})` }}
      >
        <span className={cx("icon-show")} onClick={(e) => handleShowSkill(e)}>
          <MdOutlineRemoveRedEye />
        </span>
        <div className={cx("skill-info")}>
          <h5 className={cx("skill-name")}>{skill.displayName}</h5>
          <span className={cx("skill-description", "text-clamp")}>{skill.description}</span>
        </div>
      </Link>
    </div>
  );
};
export default SkillItem;
