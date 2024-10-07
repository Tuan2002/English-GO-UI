/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalCustom from "@/components/Modal";
import style from "../LevelDetail.module.scss";
import classNames from "classnames/bind";
import Uploadimage from "@/components/UploadImage";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { CategoryAction } from "@/stores/categoryStore/categoryReducer";
import { toast } from "react-toastify";
import uploadService from "@/services/uploadService";
import { useParams } from "react-router-dom";
import { ICategoryRequestData } from "@/types/category/CategoryTypes";
import { CloudPresets } from "@/constants/CloudPreset";
const cx = classNames.bind(style);

const ModalSaveCategory = () => {
  const { levelId, skillId } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const { openModalSaveCategory, selectedCategory, actionModal } = useSelector((state: RootState) => state.categoryStore);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(CategoryAction.changeOpenModalSaveCategory(false));
    dispatch(CategoryAction.changeSelectedCategory(undefined));
    dispatch(CategoryAction.changeActionModal("create"));
    setImageFile(null);
  };
  const handleSaveCategory = async () => {
    if (categoryName.trim() === "") {
      toast.warning("Category name is required");
    }
    try {
      let image = selectedCategory?.image;
      try {
        if (imageFile !== null) {
          const uploadImage = await uploadService.uploadAnImage(imageFile, CloudPresets.IMAGE);
          image = uploadImage.data.secure_url;
        }
      } catch {
        image = selectedCategory?.image;
      }
      const dataSave: ICategoryRequestData = {
        id: selectedCategory?.id,
        name: categoryName,
        description,
        image,
        levelId: levelId ?? "",
        skillId: skillId ?? "",
      };
      if (actionModal === "create") {
        dispatch<any>(CategoryAction.createNewCategory(dataSave));
      } else {
        dispatch<any>(CategoryAction.updateCategory(dataSave));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.name);
      setDescription(selectedCategory.description ?? "");
    } else {
      setCategoryName("");
      setDescription("");
    }
  }, [selectedCategory]);
  return (
    <ModalCustom
      onOK={handleSaveCategory}
      width={500}
      modalTitle={"Create New Category"}
      open={openModalSaveCategory}
      onCancel={handleCancel}
    >
      <div className={cx("modal-content")}>
        <div className={cx("d-flex justify-content-center")}>
          {openModalSaveCategory && (
            <Uploadimage
              defaultImage={
                selectedCategory?.image && selectedCategory.image.trim() ? selectedCategory?.image : "/src/assets/folder.png"
              }
              onChangeImage={setImageFile}
              type='avatar'
            />
          )}
        </div>
        <div className='mt-10'>
          <span>Category Name</span>
          <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className='mt-10' />
        </div>
        <div className='mt-20'>
          <span>Description</span>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-10' rows={4} />
        </div>
      </div>
    </ModalCustom>
  );
};
export default ModalSaveCategory;
