import { MdOutlineRemoveRedEye } from "react-icons/md";
import style from "../SkillDetail.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ILevel } from "@/types/level/LevelTypes";
import { LevelActions } from "@/stores/levelStore/levelReducer";
import { RootState } from "@/stores";
const cx = classNames.bind(style);
interface ILevelItemProps {
  level: ILevel;
}
const LevelItem = ({ level }: ILevelItemProps) => {
  const dispatch = useDispatch();
  const handleShowLevel = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(LevelActions.changeSelectedLevel(level));
    dispatch(LevelActions.changeOpenModalLevelInfomation(true));
    e.stopPropagation();
    e.preventDefault();
  };
  const { currentSkill } = useSelector((state: RootState) => state.skillStore);
  return (
    <div className={cx("level-item-wrapper")}>
      <Link
        to={level.id}
        className={cx("level-item-box")}
        style={{ backgroundImage: `url(${level.image && level.image.trim() ? level.image : "/empty.webp"})` }}
      >
        <span className={cx("icon-show")} onClick={(e) => handleShowLevel(e)}>
          <MdOutlineRemoveRedEye />
        </span>
        <div className={cx("level-info")}>
          <h5 className={cx("level-name")}>{`${currentSkill?.displayName} ${level.displayName}`}</h5>
          <span className={cx("level-description", "text-clamp", "text-clamp-2")}>{level.description}</span>
        </div>
      </Link>
    </div>
  );
};
export default LevelItem;
