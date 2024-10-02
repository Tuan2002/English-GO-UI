import { Avatar } from "antd";
import { BiCamera } from "react-icons/bi";
import classNames from "classnames/bind";
import style from "./UploadImage.module.scss";
import { useMemo, useState } from "react";
const cx = classNames.bind(style);

interface IUploadImageProps {
  type: "avatar" | "cover";
  size?: number;
  defaultImage?: string;
  onChangeImage?: (e: any) => void;
  disabled?: boolean;
}

const Uploadimage = ({ type = "cover", size = 100, defaultImage, onChangeImage, disabled = false }: IUploadImageProps) => {
  const id = useMemo(() => {
    return `${type}-${Math.floor(Math.random() * 1000)}`;
  }, []);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChangeImage = (e: any) => {
    const image = e.target.files[0];
    if (image === undefined) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChangeImage && onChangeImage(image);
    setImagePreview(URL.createObjectURL(image));
  };
  return (
    <>
      {type === "avatar" ? (
        <div className={cx("avatar-box")}>
          <Avatar
            size={size}
            src={
              imagePreview !== null
                ? imagePreview
                : defaultImage !== null && Number(defaultImage?.length) > 0
                ? defaultImage
                : "/src/assets/user.svg"
            }
          />
          <label className={cx("camera-icon")} htmlFor={id}>
            <BiCamera />
          </label>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${imagePreview !== null ? imagePreview : defaultImage})`,
          }}
          className={cx("cover-box")}
        >
          <label className={cx("choose-cover")} htmlFor={id}>
            <BiCamera />
          </label>
        </div>
      )}
      <input disabled={disabled} type='file' id={id} hidden onChange={handleChangeImage} />
    </>
  );
};
export default Uploadimage;
