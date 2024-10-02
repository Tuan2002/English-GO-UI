/* eslint-disable @typescript-eslint/no-explicit-any */
import CardCustom from "@/components/Card";
import { RootState } from "@/stores";
import { LevelActions } from "@/stores/levelStore/levelReducer";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalLevelInfomation from "./ModalLevelInfomation";
import { Col, Row } from "antd";
import LevelItem from "./LevelItem";

const SkillDetail = () => {
  const { skillId } = useParams();
  const { currentSkill } = useSelector((state: RootState) => state.skillStore);
  const { listLevelOfSkill } = useSelector((state: RootState) => state.levelStore);
  const dispatch = useDispatch();
  useEffect(() => {
    if (skillId) {
      dispatch<any>(SkillActions.getSkillById(skillId));
      dispatch<any>(LevelActions.getLevelOfSkill(skillId));
    }
  }, [dispatch, skillId]);
  return (
    <CardCustom showBackButton title={`Skill ${currentSkill?.displayName}`} fullHeight>
      <div className='mt-10'>
        <Row gutter={[20, 20]}>
          {listLevelOfSkill.map((level) => (
            <Col key={level.id} xs={24} lg={8} md={12}>
              <LevelItem level={level} />
            </Col>
          ))}
        </Row>
        <ModalLevelInfomation />
      </div>
    </CardCustom>
  );
};
export default SkillDetail;
