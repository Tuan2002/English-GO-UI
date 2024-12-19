import { ICategory } from "@/types/category/CategoryTypes";
import style from "../LevelDetail.module.scss";
import classNames from "classnames/bind";
import { BiCheckCircle, BiDotsVerticalRounded, BiPencil, BiTrashAlt } from "react-icons/bi";
import { Popover } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch } from "react-redux";
import { CategoryAction } from "@/stores/categoryStore/categoryReducer";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
const cx = classNames.bind(style);
interface ICategoryItemProps {
  category: ICategory;
}

const ActionPopover = ({ category }: ICategoryItemProps) => {
  const dispatch = useDispatch();
  const handleUpdate = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(CategoryAction.changeActionModal("update"));
    dispatch(CategoryAction.changeSelectedCategory(category));
    dispatch(CategoryAction.changeOpenModalSaveCategory(true));
  };
  const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(CategoryAction.changeSelectedCategory(category));
    dispatch(CategoryAction.changeOpenModalConfirm(true));
    dispatch(CategoryAction.changeActionModal("delete"));
  };
  // const handleRestore = (e: MouseEvent<HTMLButtonElement>) => {
  // e.stopPropagation();
  // e.preventDefault();
  //   dispatch(CategoryAction.changeSelectedCategory(category));
  //   dispatch(CategoryAction.changeActionModal("restore"));
  //   dispatch(CategoryAction.changeOpenModalConfirm(true));
  // }
  const handleShowDetail = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(CategoryAction.changeSelectedCategory(category));
  };
  const handleActive = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(CategoryAction.changeSelectedCategory(category));
    dispatch(CategoryAction.changeActionModal("active"));
    dispatch(CategoryAction.changeOpenModalConfirm(true));
  };
  const handleInActive = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(CategoryAction.changeSelectedCategory(category));
    dispatch(CategoryAction.changeActionModal("inactive"));
    dispatch(CategoryAction.changeOpenModalConfirm(true));
  };

  return (
    <div className={cx("action-popover")}>
      <div onClick={(e) => handleUpdate(e)} className={cx("action-item")}>
        <span className={cx("icon")}>
          <BiPencil />
        </span>
        <span>Update</span>
      </div>
      {category.isActive ? (
        <div onClick={(e) => handleInActive(e)} className={cx("action-item")}>
          <span className={cx("icon")}>
            <BiCheckCircle />
          </span>
          <span>InActive</span>
        </div>
      ) : (
        <div onClick={(e) => handleActive(e)} className={cx("action-item")}>
          <span className={cx("icon")}>
            <BiCheckCircle />
          </span>
          <span>Active</span>
        </div>
      )}
      <div onClick={(e) => handleShowDetail(e)} className={cx("action-item")}>
        <span className={cx("icon")}>
          <MdOutlineRemoveRedEye />
        </span>
        <span>Show Detail</span>
      </div>
      <div onClick={(e) => handleDelete(e)} className={cx("action-item")}>
        <span className={cx("icon")}>
          <BiTrashAlt />
        </span>
        <span>Delete</span>
      </div>
    </div>
  );
};

const CategoryItem = ({ category }: ICategoryItemProps) => {
  return (
    <Link to={category.id} className={cx("category-item-wrapper")}>
      <Popover trigger={"hover"} placement='bottomRight' content={<ActionPopover category={category} />}>
        <span className={cx("icon-more")}>
          <BiDotsVerticalRounded />
        </span>
      </Popover>
      <div className={cx("category-name", "text-clamp", "text-clamp-1")}>{category.name}</div>
      <div
        className={cx("category-image")}
        style={{
          backgroundImage: `url(${category?.image && category.image.trim() ? category.image : "/folder.png"})`,
        }}
      ></div>
    </Link>
  );
};
export default CategoryItem;
