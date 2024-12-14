/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import style from "./ExamFooter.module.scss";
import classNames from "classnames/bind";
import { RootState } from "@/stores";
import { ExamActions } from "@/stores/examStore/examReducer";
import { useEffect } from "react";
import { AppDispatch } from "@/stores";
import { ITargetQuestionOfSkill } from "@/types/exam/ExamTypes";
import { Col, Row, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ROUTE_PATH from "@/routes/routePath";
const cx = classNames.bind(style);
const ExamScoreFooter = () => {
  const { listSkill } = useSelector((state: RootState) => state.skillStore);
  const { examId } = useParams<{ examId: string }>();
  const { listLevelOfSkill, listQuestionOfSkill, selectedSkill, selectedLevel, targetQuestionOfSkill, currentSkill } =
    useSelector((state: RootState) => state.examStore);
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigate();
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

  const handleChangeTargetQuestion = (question: ITargetQuestionOfSkill) => {
    dispatch(ExamActions.changeCurrentTargetQuestion(question));
    handleChangeSelectedLevel(question.levelId);
  };

  const handleChangeCurrentSkill = (skillId: string) => {
    navigation(`${ROUTE_PATH.EXAM_RESULT.replace(":examId", examId ?? "")}?skill=${skillId}`);
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
                <div className='skeleton scrollbar' style={{ display: "flex", gap: "10px", flexWrap: "wrap", height: "80px" }}>
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
                      onClick={() => handleChangeCurrentSkill(skill.id)}
                      className={cx("skill-item", "constructor-item", {
                        active: skill.id === currentSkill,
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
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ExamScoreFooter;
