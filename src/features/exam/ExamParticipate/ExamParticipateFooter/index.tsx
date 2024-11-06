/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import style from "./ExamFooter.module.scss";
import classNames from "classnames/bind";
import { RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { useEffect } from "react";
import { AppDispatch } from "@/stores";
import { ISubmitSkillRequest, ITargetQuestionOfSkill } from "@/types/exam/ExamTypes";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { Col, Row, Skeleton } from "antd";
const cx = classNames.bind(style);
const ExamParticipateFooter = () => {
  const { listSkill } = useSelector((state: RootState) => state.skillStore);
  const { listLevelOfSkill, listQuestionOfSkill, selectedSkill, selectedLevel, openModalSubmitSkill, targetQuestionOfSkill } =
    useSelector((state: RootState) => state.examStore);
  const dispatch: AppDispatch = useDispatch();
  const handleChangeSelectedLevel = (levelId: string) => {
    if (selectedSkill?.skillId === "speaking") return;
    dispatch(ExamActions.changeSelectedLevel(levelId));
  };
  useEffect(() => {
    const question = listQuestionOfSkill?.find(
      (question) => question.levelId === selectedLevel && question.skill?.id === selectedSkill?.skillId
    );
    if (question) {
      dispatch(ExamActions.changeSelectedQuestion(question));
    }
  }, [dispatch, listQuestionOfSkill, selectedLevel, selectedSkill]);

  const handleSendSkill = () => {
    // Call api to send skill
    const data: ISubmitSkillRequest = {
      skillId: selectedSkill?.skillId || "",
      questions: listQuestionOfSkill || [],
    };
    dispatch(ExamActions.submitSkill(data)).then((response: any) => {
      if (response.payload.success) {
        dispatch(ExamActions.continueExam());
      }
    });
  };
  const handleClickBtnSubmitSkill = () => {
    dispatch(ExamActions.changeOpenModalSubmitSkill(true));
  };
  const handleCancel = () => {
    dispatch(ExamActions.changeOpenModalSubmitSkill(false));
  };
  const handleChangeTargetQuestion = (question: ITargetQuestionOfSkill) => {
    dispatch(ExamActions.changeCurrentTargetQuestion(question));
    handleChangeSelectedLevel(question.levelId);
  };
  return (
    <div className={cx("footer-wrapper")}>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <div className={cx("info-box", "scrollbar")}>
            <div className={cx("questions")}>
              {targetQuestionOfSkill && targetQuestionOfSkill?.length > 0 ? (
                targetQuestionOfSkill.map((target, index) => {
                  return (
                    <span
                      onClick={() => handleChangeTargetQuestion(target)}
                      key={index}
                      className={cx("question-item", { active: target.isDone })}
                    >
                      {index + 1}
                    </span>
                  );
                })
              ) : (
                <div className='skeleton' style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {Array.from({ length: 40 }).map((_, index) => (
                    <Skeleton.Button
                      key={index}
                      active
                      size='small'
                      style={{ width: "30px", height: "30px", minWidth: "30px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={cx("action-box")}>
            <div className={cx("constructor-box")}>
              <div className={cx("levels")}>
                {listLevelOfSkill && listLevelOfSkill?.length > 0 ? (
                  listLevelOfSkill?.map((level, index) => (
                    <span
                      key={index}
                      onClick={() => handleChangeSelectedLevel(level.id)}
                      className={cx("level-item", "constructor-item", {
                        active: level.id === selectedLevel,
                      })}
                    >
                      {level.displayName}
                    </span>
                  ))
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
                    <Skeleton.Button active size='small' style={{ width: "100px", height: "30px" }} />
                    <Skeleton.Button active size='small' style={{ width: "100px", height: "30px" }} />
                    <Skeleton.Button active size='small' style={{ width: "100px", height: "30px" }} />
                  </div>
                )}
              </div>
              <div className={cx("skills")}>
                {listSkill && listSkill?.length > 0 ? (
                  listSkill.map((skill, index) => (
                    <span
                      key={index}
                      className={cx("skill-item", "constructor-item", {
                        active: skill.id === selectedSkill?.skillId,
                      })}
                    >
                      {skill.name}
                    </span>
                  ))
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                    <Skeleton.Button active size='small' style={{ width: "80px", height: "30px" }} />
                    <Skeleton.Button active size='small' style={{ width: "80px", height: "30px" }} />
                    <Skeleton.Button active size='small' style={{ width: "80px", height: "30px" }} />
                    <Skeleton.Button active size='small' style={{ width: "80px", height: "30px" }} />
                  </div>
                )}
              </div>
            </div>
            <div className={cx("send-box")}>
              <button onClick={handleClickBtnSubmitSkill} className={cx("send-button")}>
                NẠP <br /> KĨ NĂNG
              </button>
              <ModalConfirm
                modalTitle={`Xác nhận hoàn thành kĩ năng ${selectedSkill?.skill.name}`}
                confirmText='Bạn có chắc chắn muốn nạp kĩ năng này không? Sau khi chuyển qua kĩ năng tiếp theo, bạn không thể quay lại kĩ năng trước đó!'
                open={openModalSubmitSkill}
                onCancel={handleCancel}
                onOK={handleSendSkill}
              ></ModalConfirm>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ExamParticipateFooter;
