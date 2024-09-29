import { RootState } from "@/stores";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkillItem from "./SkillItem";
import { Col, Row } from "antd";

const ListSkill = () => {
  const dispatch = useDispatch();
  const { listSkill } = useSelector((state: RootState) => state.skillStore);
  useEffect(() => {
    dispatch<any>(SkillActions.getAllSkills());
  }, [dispatch]);
  return (
    <div className='mt-10'>
      <Row gutter={[20, 20]}>
        {listSkill.map((skill) => (
          <Col key={skill.id} xs={24} lg={12}>
            <SkillItem skill={skill} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default ListSkill;
