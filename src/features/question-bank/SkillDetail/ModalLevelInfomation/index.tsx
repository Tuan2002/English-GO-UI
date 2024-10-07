/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { Button, Input, InputRef } from "antd";
import { useDispatch, useSelector } from "react-redux";
import style from "../SkillDetail.module.scss";
import classNames from "classnames/bind";
import Uploadimage from "@/components/UploadImage";
import { useEffect, useRef, useState } from "react";
import uploadService from "@/services/uploadService";
import { CloudPresets } from "@/constants/CloudPreset";
import { LevelActions } from "@/stores/levelStore/levelReducer";
import { ILevelDataUpdate } from "@/types/level/LevelTypes";
const cx = classNames.bind(style);

interface IModalFooterProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  onUpdate?: () => void;
  isDisable?: boolean;
}
const ModalFooter = ({ onCancel, onConfirm, onUpdate, isDisable = true }: IModalFooterProps) => {
  const { isSubmiting } = useSelector((state: RootState) => state.levelStore);
  return (
    <div className={cx("modal-footer-custom")}>
      <Button onClick={onCancel} type='default'>
        Cancel
      </Button>
      {isDisable ? (
        <Button onClick={onUpdate} type='primary' htmlType='submit' className='ml-10'>
          Update
        </Button>
      ) : (
        <Button loading={isSubmiting} onClick={onConfirm} type='primary' htmlType='submit' className='ml-10'>
          Save
        </Button>
      )}
    </div>
  );
};

const ModalLevelInfomation = () => {
  const { openModalLevelInfomation, selectedLevel } = useSelector((state: RootState) => state.levelStore);
  const { currentSkill } = useSelector((state: RootState) => state.skillStore);
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [subQuestionNumber, setsubQuestionNumber] = useState<number>(0);
  const { TextArea } = Input;
  const textRef = useRef<InputRef>(null);
  const handleCancel = () => {
    dispatch(LevelActions.changeOpenModalLevelInfomation(false));
    dispatch(LevelActions.changeSelectedLevel(undefined));
    setIsDisable(true);
    setAvatarFile(null);
  };
  const handleConfirm = async () => {
    dispatch(LevelActions.changeIsSubmiting(true));
    let image = selectedLevel?.image;
    if (avatarFile) {
      try {
        const response = await uploadService.uploadAnImage(avatarFile, CloudPresets.IMAGE);
        if (response.data.public_id) {
          image = response.data.secure_url;
        }
      } catch {
        image = selectedLevel?.image;
      }
    }
    const dataUpdate: ILevelDataUpdate = {
      levelId: selectedLevel?.id || "",
      image,
      description,
      subQuestionNumber,
    };
    dispatch<any>(LevelActions.updateLevel(dataUpdate));
    setIsDisable(true);
  };
  const handleUpdate = () => {
    setIsDisable(false);
    textRef.current?.focus();
  };
  useEffect(() => {
    if (openModalLevelInfomation) {
      setDescription(selectedLevel?.description || "");
      setsubQuestionNumber(selectedLevel?.subQuestionNumber || 0);
    }
  }, [openModalLevelInfomation, selectedLevel?.description, selectedLevel?.id, selectedLevel?.subQuestionNumber]);
  return (
    <ModalCustom
      customFooter={
        <ModalFooter isDisable={isDisable} onCancel={handleCancel} onConfirm={handleConfirm} onUpdate={handleUpdate} />
      }
      width={500}
      modalTitle={`${currentSkill?.displayName} ${selectedLevel?.displayName}`}
      open={openModalLevelInfomation}
      onCancel={handleCancel}
    >
      <div className={cx("modal-content")}>
        <div className={cx("d-flex justify-content-center")}>
          <Uploadimage
            defaultImage={
              selectedLevel?.image !== null && selectedLevel?.image?.trim() ? selectedLevel?.image : "/src/assets/empty.webp"
            }
            onChangeImage={setAvatarFile}
            type='avatar'
            disabled={isDisable}
          />
        </div>
        <div className='mt-10'>
          <span>Sub question number</span>
          <Input
            value={subQuestionNumber}
            disabled={isDisable}
            onChange={(e) => setsubQuestionNumber(+e.target.value)}
            required
            type='number'
            className='mt-10'
            ref={textRef}
            min={0}
            max={100}
          />
        </div>
        <div className='mt-20'>
          <span>Description</span>
          <TextArea
            disabled={isDisable}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='mt-10'
            rows={4}
          />
        </div>
      </div>
    </ModalCustom>
  );
};
export default ModalLevelInfomation;
