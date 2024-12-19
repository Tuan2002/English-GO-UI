/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import { Button, Input, InputRef } from "antd";
import { useDispatch, useSelector } from "react-redux";
import style from "../ListSkill.module.scss";
import classNames from "classnames/bind";
import Uploadimage from "@/components/UploadImage";
import { useEffect, useRef, useState } from "react";
import uploadService from "@/services/uploadService";
import { ISkillDataUpdate } from "@/types/skill/SkillType";
import { CloudPresets } from "@/constants/CloudPreset";
const cx = classNames.bind(style);

interface IModalFooterProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  onUpdate?: () => void;
  isDisable?: boolean;
}
const ModalFooter = ({ onCancel, onConfirm, onUpdate, isDisable = true }: IModalFooterProps) => {
  const { isSubmiting } = useSelector((state: RootState) => state.skillStore);
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

const ModalSkillInfomation = () => {
  const { openModalSkillInfomation, selectedSkill } = useSelector((state: RootState) => state.skillStore);
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const { TextArea } = Input;
  const textRef = useRef<InputRef>(null);
  const handleCancel = () => {
    dispatch(SkillActions.changeOpenModalSkillInfomation(false));
    dispatch(SkillActions.changeSelectedSkill(undefined));
    setIsDisable(true);
    setAvatarFile(null);
  };
  const handleConfirm = async () => {
    dispatch(SkillActions.changeIsSubmiting(true));
    let image = selectedSkill?.image;
    if (avatarFile) {
      try {
        const response = await uploadService.uploadAnImage(avatarFile, CloudPresets.IMAGE);
        if (response.data.public_id) {
          image = response.data.secure_url;
        }
      } catch {
        image = selectedSkill?.image;
      }
    }
    const dataUpdate: ISkillDataUpdate = {
      skillId: selectedSkill?.id || "",
      image,
      description,
    };
    dispatch<any>(SkillActions.updateSkill(dataUpdate));
    setIsDisable(true);
  };
  const handleUpdate = () => {
    setIsDisable(false);
    textRef.current?.focus();
  };
  useEffect(() => {
    if (openModalSkillInfomation) {
      setDescription(selectedSkill?.description || "");
    }
  }, [openModalSkillInfomation, selectedSkill?.description, selectedSkill?.id]);

  return (
    <ModalCustom
      customFooter={
        <ModalFooter isDisable={isDisable} onCancel={handleCancel} onConfirm={handleConfirm} onUpdate={handleUpdate} />
      }
      width={500}
      modalTitle={selectedSkill?.displayName}
      open={openModalSkillInfomation}
      onCancel={handleCancel}
    >
      <div className={cx("modal-content")}>
        <div className={cx("d-flex justify-content-center")}>
          <Uploadimage
            defaultImage={
              selectedSkill?.image !== null && selectedSkill?.image?.trim() ? selectedSkill?.image : "/empty.webp"
            }
            onChangeImage={setAvatarFile}
            type='avatar'
            disabled={isDisable}
          />
        </div>
        <div className='mt-10'>
          <span>Description</span>
          <TextArea
            disabled={isDisable}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='mt-10'
            rows={4}
            ref={textRef}
          />
        </div>
      </div>
    </ModalCustom>
  );
};
export default ModalSkillInfomation;
