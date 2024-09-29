import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ISkill } from "@/types/skill/SkillType";
import style from "../ListSkill.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);
interface ISkillItemProps {
  skill: ISkill;
}
const SkillItem = ({ skill }: ISkillItemProps) => {
  const handleShowSkill = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log("Show skill");
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <div className={cx("skill-item-wrapper")}>
      <Link to={skill.id} className={cx("skill-item-box")}>
        <span className={cx("icon-show")} onClick={(e) => handleShowSkill(e)}>
          <MdOutlineRemoveRedEye />
        </span>
        <div className={cx("skill-info")}>
          <h5 className={cx("skill-name")}>{skill.displayName}</h5>
          <span className={cx("skill-description")}>{skill.description}</span>
        </div>
      </Link>
    </div>
  );
};
export default SkillItem;
