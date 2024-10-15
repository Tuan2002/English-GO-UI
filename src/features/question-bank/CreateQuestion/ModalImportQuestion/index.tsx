import ModalCustom from "@/components/Modal";
import { RootState } from "@/stores";
import { QuestionActions } from "@/stores/questionStore/questionReducer";
import Dragger from "antd/es/upload/Dragger";
import { message, UploadFile, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import importQuestion from "@/utils/extensions/importQuestion";
import { IQuestionDetail } from "@/types/question/QuestionTypes";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const ModalImportQuestion = () => {
  const { openModalImportQuestion } = useSelector((state: RootState) => state.questionStore);
  const { categoryId, skillId, levelId } = useParams();
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(QuestionActions.changeOpenModalImportQuestion(false));
  };
  const [fileUpload, setFileUpload] = useState<UploadFile>();

  const props: UploadProps = {
    name: "file",
    multiple: false,
    customRequest({ onSuccess }) {
      setTimeout(() => {
        onSuccess?.("ok"); // Giả lập việc upload thành công mà không thực sự upload
      }, 1000);
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        setFileUpload(info.file);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handleConfirmImport = () => {
    try {
      const reader = new FileReader();
      const file = fileUpload?.originFileObj;
      if (!file || file.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        message.warning("Bạn chỉ có thể chọn file word để nhập vào hệ thống");
        return;
      }
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          const result = importQuestion(content);
          const listQuestionImport: IQuestionDetail[] = result.map((item) => {
            const question: IQuestionDetail = {
              id: item.id ?? uuidv4(),
              questionContent: item.questionContent,
              description: item.description,
              questionNote: item.questionNote,
              attachedFile: item.attachedFile,
              subQuestions: item.subQuestions,
              error: undefined,
              categoryId: categoryId ?? "",
              levelId: levelId ?? "",
              skillId: skillId ?? "",
              isDeleted: false,
              isActive: true,
            };
            return question;
          });
          dispatch(QuestionActions.changeListCreateQuestions(listQuestionImport));
          dispatch(QuestionActions.changeOpenModalImportQuestion(false));
        } else {
          message.error("File content is not valid.");
        }
      };
      reader.onerror = (err) => console.error(err);
      reader.readAsBinaryString(file);
    } catch (e) {
      console.log(e);
      message.error("Lỗi mất rồi, vui lòng thử lại sau");
    }
  };
  return (
    <ModalCustom
      onOK={handleConfirmImport}
      modalTitle='Import question from file'
      width={500}
      open={openModalImportQuestion}
      onCancel={handleCancel}
    >
      <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>
    </ModalCustom>
  );
};
export default ModalImportQuestion;
