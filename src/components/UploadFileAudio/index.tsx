import { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import style from "./UploadFileAudio.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface IUploadFileAudioProps {
  onChangeAudio?: (file: File) => void;
}

const UploadFileAudio = ({ onChangeAudio }: IUploadFileAudioProps) => {
  const [audioPreview, setAudioPreview] = useState<string | undefined>(undefined);
  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file) {
        const audioURL = URL.createObjectURL(file);
        setAudioPreview(audioURL);
        if (onChangeAudio) {
          onChangeAudio(file);
        }
      }
    }
  };
  return (
    <div className='d-flex'>
      <audio key={audioPreview} controls className={cx("custom-audio")}>
        {audioPreview && <source src={audioPreview} type='audio/mpeg' />}
        Your browser does not support the audio element.
      </audio>
      <label htmlFor='audio' className={cx("upload-audio")}>
        <BiCloudUpload />
      </label>
      <input hidden id='audio' type='file' accept='audio/*' onChange={handleAudioUpload} />
    </div>
  );
};
export default UploadFileAudio;
