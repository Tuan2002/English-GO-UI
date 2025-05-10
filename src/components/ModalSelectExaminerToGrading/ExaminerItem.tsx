import { IExaminerWithIntroduction } from "@/types/examinerIntroduction/ExaminerIntroductionTypes";
import { Checkbox, Popover } from "antd";
import classNames from "classnames/bind";
import HTMLDisplay from "../HtmlDisplay";
import style from "./ModalSelectExaminerToGrading.module.scss";
const cx = classNames.bind(style);

type ExaminerItemProps = {
  examinerIntroduction: IExaminerWithIntroduction;
  changeSelectedExaminer?: (examinerId: string | null) => void;
  selectedExaminer?: string | null;
};

const ExaminerDetail = ({ examinerIntroduction }: ExaminerItemProps) => {
  return (
    <div className={cx("examiner-detail", "scrollbar")}>
      <div className={cx("examiner-avatar")}>
        <img
          className="full-width full-height"
          src={
            examinerIntroduction.avatar ||
            "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
          }
          alt="avatar"
        />
        <span>{examinerIntroduction.fullName}</span>
      </div>
      <div className={cx("examiner-detail-content")}>
        <div className={cx("body-box")}>
          <div className={cx("description")}>
            {examinerIntroduction?.examinerIntroduction?.description && (
              <p>
                <span className={cx("space")}></span>"
                {examinerIntroduction.examinerIntroduction?.description}"
              </p>
            )}
          </div>
          <div className={cx("introduction-item")}>
            <span className={cx("title")}>Email:</span>
            <span className={cx("text")}>{examinerIntroduction?.email}</span>
          </div>
          <div className={cx("introduction-item")}>
            <span className={cx("title")}>Tên tài khoản:</span>
            <span className={cx("text")}>{examinerIntroduction?.username}</span>
          </div>
          <div className={cx("introduction-item")}>
            <span className={cx("title")}>Ngày sinh:</span>
            <span className={cx("text")}>
              {examinerIntroduction?.birthday ?? "Chưa cập nhật"}
            </span>
          </div>
          <div className={cx("introduction-item")}>
            <span className={cx("title")}>Điện thoại:</span>
            <span className={cx("text")}>
              {examinerIntroduction?.phoneNumber ?? "Chưa cập nhật"}
            </span>
          </div>
          <div className={cx("introduction-item")}>
            <span className={cx("title")}>Đơn vị công tác:</span>
            <span className={cx("text")}>
              {examinerIntroduction.examinerIntroduction?.workPlace ??
                "Chưa cập nhật"}
            </span>
          </div>
          <div className={cx("introduction-item")}>
            <span className={cx("title")}>Địa chỉ công tác:</span>
            <span className={cx("text")}>
              {examinerIntroduction.examinerIntroduction?.workAddress ??
                "Chưa cập nhật"}
            </span>
          </div>
        </div>
        {examinerIntroduction.examinerIntroduction?.introduction && (
          <div className={cx("introduction")}>
            <HTMLDisplay
              htmlContent={
                examinerIntroduction.examinerIntroduction?.introduction
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ExaminerItem = ({
  examinerIntroduction,
  selectedExaminer,
  changeSelectedExaminer,
}: ExaminerItemProps) => {
  return (
    <div className={cx("examiner-item")}>
      <Popover
        content={<ExaminerDetail examinerIntroduction={examinerIntroduction} />}
        arrow={true}
        trigger="click"
      >
        <div className={cx("examiner-item-box")}>
          <span className={cx("examiner-choose")}>
            <Checkbox
              checked={selectedExaminer === examinerIntroduction.id}
              onChange={() => changeSelectedExaminer?.(examinerIntroduction.id)}
            />
          </span>
          <div className={cx("examiner-avatar")}>
            <img
              className="full-width full-height"
              src={
                examinerIntroduction.avatar ||
                "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
              }
              alt="avatar"
            />
            <span>{examinerIntroduction.fullName}</span>
          </div>
          <p className={cx("examiner-description")}>
            {examinerIntroduction.examinerIntroduction?.description &&
            examinerIntroduction.examinerIntroduction?.description.trim() !== ""
              ? examinerIntroduction.examinerIntroduction?.description
              : "Chưa cập nhật thông tin mô tả"}
          </p>
        </div>
      </Popover>
    </div>
  );
};
export default ExaminerItem;
