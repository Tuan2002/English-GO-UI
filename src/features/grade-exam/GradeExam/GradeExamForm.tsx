import { GradeTargetLabels, GradeTargets } from "@/constants/GradeTargets";
import { IFeedbackDetail } from "@/types/gradingFeedback/GradingFeedbackType";
import { Button, Checkbox, Col, Input, Popover, Row, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { TooltipRef } from "antd/es/tooltip";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import style from "./GradeExam.module.scss";
const cx = classNames.bind(style);

interface IGradeExamFormProps {
  gradeFeedbackValue: IFeedbackDetail;
  skill: string;
  changeGradeFeedbackValue: (value: IFeedbackDetail) => void;
}
interface IAddFieldPopoverContentProps {
  listSelectedFields: GradeTargets[];
  selectedFields: GradeTargets[];
  handleSaveUpdate: () => void;
  handleToogleChange: (field: GradeTargets) => void;
}
const AddFieldPopoverContent = ({
  selectedFields,
  handleSaveUpdate,
  handleToogleChange,
  listSelectedFields,
}: IAddFieldPopoverContentProps) => {
  return (
    <div className={cx("add-field-popover")}>
      <div className={cx("add-field-header")}>
        <h5 className={cx("item-title")}>Chọn các tiêu chí đánh giá</h5>
      </div>
      <div className={cx("add-field-content")}>
        {Object.keys(GradeTargetLabels).map((key) => (
          <>
            {listSelectedFields.includes(key as GradeTargets) ? null : (
              <div key={key} className={cx("feedback-item")}>
                <Checkbox
                  checked={selectedFields.includes(key as GradeTargets)}
                  onChange={() => handleToogleChange(key as GradeTargets)}
                >
                  {GradeTargetLabels[key as GradeTargets]}
                </Checkbox>
              </div>
            )}
          </>
        ))}
        {Object.keys(GradeTargetLabels).length !== listSelectedFields.length ? (
          <div className='mt-10 d-flex justify-content-end'>
            <Button onClick={handleSaveUpdate} className={cx("add-field-button")}>
              Cập nhật
            </Button>
          </div>
        ) : (
          <div>
            <span>Bạn đã thêm hết các tiêu chí</span>
          </div>
        )}
      </div>
    </div>
  );
};

const GradeExamForm = ({ gradeFeedbackValue, skill, changeGradeFeedbackValue }: IGradeExamFormProps) => {
  const popoverRef = useRef<TooltipRef>(null);
  const [listSelectedFields, setListSelectedFields] = useState<GradeTargets[]>(() =>
    gradeFeedbackValue?.feedbackDetail?.map((item) => item.title)
  );
  const [selectedFields, setSelectedFields] = useState<GradeTargets[]>(listSelectedFields);
  const [textInput, setTextInput] = useState<string>("");
  const [focusedField, setFocusedField] = useState<GradeTargets | null>(null);

  const handleChangeTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleFocusField = (field: GradeTargets) => {
    setFocusedField(field);
    const selectedField = gradeFeedbackValue.feedbackDetail.find((item) => item.title === field);
    const title = selectedField ? selectedField.feedback.join("\n") : "";
    setTextInput(title);
  };

  const handleBlurField = (field: GradeTargets) => {
    const updatedFeedbackDetail = gradeFeedbackValue.feedbackDetail.map((item) => {
      if (item.title === field) {
        return { ...item, feedback: textInput.split("\n") };
      }
      return item;
    });
    changeGradeFeedbackValue({ ...gradeFeedbackValue, feedbackDetail: updatedFeedbackDetail });
    setFocusedField(null);
  };

  const handleToogleChange = (field: GradeTargets) => {
    setSelectedFields((prev) => {
      if (prev.includes(field)) {
        return prev.filter((item) => item !== field);
      } else {
        return [...prev, field];
      }
    });
  };

  const handleSaveUpdate = () => {
    setListSelectedFields((prev) => [...prev, ...selectedFields]);
    const newGradeFeedbackValue = {
      ...gradeFeedbackValue,
      feedbackDetail: [
        ...gradeFeedbackValue.feedbackDetail,
        ...selectedFields.map((field) => {
          return {
            title: field,
            score: "0",
            feedback: [],
          };
        }),
      ],
    };
    setSelectedFields([]);
    changeGradeFeedbackValue(newGradeFeedbackValue);
    popoverRef.current?.nativeElement.click();
  };

  const handleChangeTextField = (value: string, field: string) => {
    changeGradeFeedbackValue({
      ...gradeFeedbackValue,
      [field]: value.split("\n"),
    });
  };

  const handleRemoveField = (field: GradeTargets) => {
    const newListSelectedFields = listSelectedFields.filter((item) => item !== field);
    setListSelectedFields(newListSelectedFields);
    const updateGradeFeedbackValue = {
      ...gradeFeedbackValue,
      feedbackDetail: gradeFeedbackValue.feedbackDetail.filter((item) => item.title !== field),
    };
    changeGradeFeedbackValue(updateGradeFeedbackValue);
  };

  const handleChangeScore = (value: string) => {
    const newGradeFeedbackValue = {
      ...gradeFeedbackValue,
      score: value,
    };
    changeGradeFeedbackValue(newGradeFeedbackValue);
  };

  return (
    <div className={cx("feedback-content")}>
      <Row gutter={20}>
        <Col span={24}>
          <div className={cx("grade-comment-item")}>
            <h5 className={cx("item-title")}>
              <span>1. Nhận xét chung:</span>
              <div className={cx("score-box")}>
                <span>Tổng điểm</span>
                <Input
                  value={gradeFeedbackValue.score}
                  onChange={(e) => handleChangeScore(e.target.value)}
                  type='number'
                  min={0}
                  max={10}
                  step={0.5}
                  className={cx("score-input")}
                />
              </div>
            </h5>
            <TextArea
              className='mt-10'
              rows={4}
              value={gradeFeedbackValue?.overall_feedback?.join("\n")}
              onChange={(e) => handleChangeTextField(e.target.value, "overall_feedback")}
            ></TextArea>
          </div>
        </Col>
        {gradeFeedbackValue?.feedbackDetail?.map((item, index) => (
          <Col span={12} key={index}>
            <div className={cx("grade-comment-item", "mt-10")}>
              <h5 className={cx("item-title")}>
                <span>
                  {index + 2}. {GradeTargetLabels[item.title]}
                </span>
                <div className={cx("score-box")}>
                  {/* <span>Chấm điểm</span>
                  <Input className={cx("score-input")} /> */}
                  <Button onClick={() => handleRemoveField(item.title)} type='primary' danger style={{ padding: "0 10px" }}>
                    X
                  </Button>
                </div>
              </h5>
              <TextArea
                onFocus={() => handleFocusField(item.title)}
                onChange={handleChangeTextInput}
                onBlur={() => handleBlurField(item.title)}
                className='mt-10'
                rows={4}
                value={focusedField === item.title ? textInput : item.feedback.join("\n")}
              ></TextArea>
            </div>
          </Col>
        ))}
        <Col span={12}>
          <div className={cx("add-more-field")}>
            <Popover
              ref={popoverRef}
              content={
                <AddFieldPopoverContent
                  listSelectedFields={listSelectedFields}
                  selectedFields={selectedFields}
                  handleSaveUpdate={handleSaveUpdate}
                  handleToogleChange={handleToogleChange}
                />
              }
              trigger='click'
            >
              <Tooltip placement='top' title='Thêm nhận xét'>
                <span className={cx("button-add")}>+</span>
              </Tooltip>
            </Popover>
          </div>
        </Col>
        {skill === "writing" && (
          <Col span={24}>
            <div className={cx("grade-comment-item", "mt-10")}>
              <h5 className={cx("item-title")}>
                {gradeFeedbackValue.feedbackDetail?.length + 2}. Bài viết sau khi được chỉnh sửa:
              </h5>
              <TextArea
                onChange={(e) => handleChangeTextField(e.target.value, "corrected_essay")}
                className='mt-10'
                rows={4}
                value={gradeFeedbackValue?.corrected_essay?.join("\n")}
              ></TextArea>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default GradeExamForm;
