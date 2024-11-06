/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Skeleton } from "antd";
import style from "./ExamHeader.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { useEffect, useState } from "react";
import { ISkill } from "@/types/skill/SkillType";
import ExpiredTime from "./ExpiredTime";
import { ISubmitSkillRequest } from "@/types/exam/ExamTypes";
import { ExamActions } from "@/stores/examStore/examReducer";
const cx = classNames.bind(style);
const ExamParticipateHeader = () => {
  const { selectedSkill, listQuestionOfSkill } = useSelector((state: RootState) => state.examStore);
  const { listSkill } = useSelector((state: RootState) => state.skillStore);
  const [selectedSkillInfo, setSelectedSkillInfo] = useState<ISkill | undefined>(undefined);
  const [timeCountDown, setTimeCountDown] = useState<number | undefined>(undefined);
  const dispatch: AppDispatch = useDispatch();
  const handleSubmitSkill = () => {
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

  useEffect(() => {
    if (listSkill && selectedSkill) {
      setSelectedSkillInfo(listSkill.find((skill) => skill.id === selectedSkill.skillId));
    }
  }, [listSkill, selectedSkill]);
  useEffect(() => {
    if (selectedSkill?.startTime && selectedSkill.skill.expiredTime) {
      setTimeCountDown(
        Math.floor(
          Number(selectedSkill?.skill.expiredTime) * 60 - (new Date().getTime() - Number(selectedSkill?.startTime)) / 1000
        )
      );
    }
  }, [selectedSkill]);
  return (
    <div className={cx("exam-header-wrapper")}>
      <Row className='full-height full-width'>
        <Col className='full-height' lg={12}>
          <div className={cx("skill-info")}>
            {selectedSkillInfo?.id ? (
              <div className={cx("item")}>
                <span className={cx("name")}>Skill: </span>
                <span className={cx("desc")}>{selectedSkillInfo?.displayName}</span>
              </div>
            ) : (
              <div className={cx("item")}>
                <Skeleton.Input block active size='large' style={{ height: "24px" }} />
              </div>
            )}
            {selectedSkillInfo?.id ? (
              <div className={cx("item")}>
                <span className={cx("name")}>Directions: </span>
                <span className={cx("desc")}>{selectedSkillInfo?.description}</span>
              </div>
            ) : (
              <div className={cx("item")}>
                <Skeleton.Input block active size='large' style={{ height: "36px", marginTop: "3px" }} />
              </div>
            )}
          </div>
        </Col>
        <Col className='full-height' lg={12}>
          <div className={cx("time-box")}>
            <div className={cx("time")}>
              <div className={cx("wrapper")}>
                {<ExpiredTime handleSubmit={handleSubmitSkill} initTime={timeCountDown} />}
                <img src='/src/assets/clock.svg' alt='' className={cx("clock-icon")} />
              </div>
            </div>
            <div>
              <img src='/src/assets/panda.png' alt='panda' className={cx("panda-img")} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ExamParticipateHeader;
