/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import style from "./ExamFooter.module.scss";
import classNames from "classnames/bind";
import { RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { useEffect } from "react";
import { AppDispatch } from "@/stores";
import { ISubmitSkillRequest } from "@/types/exam/ExamTypes";
import ModalConfirm from "@/components/Modal/ModalConfirm";
const cx = classNames.bind(style);
const ExamParticipateFooter = () => {
  const { listSkill } = useSelector((state: RootState) => state.skillStore);
  const { listLevelOfSkill, listQuestionOfSkill, selectedSkill, selectedLevel, openModalSubmitSkill } = useSelector(
    (state: RootState) => state.examStore
  );
  const dispatch: AppDispatch = useDispatch();
  const handleChangeSelectedLevel = (levelId: string) => {
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
  return (
    <div className={cx("footer-wrapper")}>
      <div className={cx("action-box")}>
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
        <div className={cx("constructor-box")}>
          <div className={cx("levels")}>
            {listLevelOfSkill?.map((level, index) => (
              <span
                key={index}
                onClick={() => handleChangeSelectedLevel(level.id)}
                className={cx("level-item", "constructor-item", {
                  active: level.id === selectedLevel,
                })}
              >
                {level.displayName}
              </span>
            ))}
          </div>
          <div className={cx("skills")}>
            {listSkill.map((skill, index) => (
              <span
                key={index}
                className={cx("skill-item", "constructor-item", {
                  active: skill.id === selectedSkill?.skillId,
                })}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("info-box")}></div>
    </div>
  );
};
export default ExamParticipateFooter;

// let title = "Your Joker Infomations: ";
// const repeat = " ".repeat(3);
// data.jokes.forEach((joke, index) => {
//   title += `${repeat}- Joke ${index}: ${joke.joke} \n`;
// });
// return title;
