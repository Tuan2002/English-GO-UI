/* eslint-disable @typescript-eslint/no-explicit-any */
import CardCustom from "@/components/Card";
import { RootState } from "@/stores";
import { CategoryAction } from "@/stores/categoryStore/categoryReducer";
import { LevelActions } from "@/stores/levelStore/levelReducer";
import { SkillActions } from "@/stores/skillStore/skillReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import { Button, Col, Input, Row } from "antd";
import ModalSaveCategory from "./ModalSaveCategory";
import ModalCategoryConfirm from "./ModalCategoryConfirm";

const LevelDetail = () => {
  const { levelId, skillId } = useParams();
  const dispatch = useDispatch();
  const { currentSkill } = useSelector((state: RootState) => state.skillStore);
  const { currentLevel } = useSelector((state: RootState) => state.levelStore);
  const { categories } = useSelector((state: RootState) => state.categoryStore);
  useEffect(() => {
    if (skillId && levelId) {
      dispatch<any>(SkillActions.getSkillById(skillId));
      dispatch<any>(LevelActions.getLevelById(levelId));
      dispatch<any>(CategoryAction.getAllCategoryOfLevel(levelId));
    }
  }, [skillId, levelId, dispatch]);

  const handleClickBtnAddCategory = () => {
    dispatch(CategoryAction.changeActionModal("create"));
    dispatch(CategoryAction.changeSelectedCategory(undefined));
    dispatch(CategoryAction.changeOpenModalSaveCategory(true));
  };
  return (
    <CardCustom showBackButton title={`${currentSkill?.displayName} / ${currentLevel?.displayName}`} fullHeight>
      <div className=''>
        <Row gutter={[20, 10]} justify={"space-between"}>
          <Col xs={24} md={12} lg={8} xl={6}>
            <div>
              <Input className='full-width' placeholder='Search category' />
            </div>
          </Col>
          <Col xs={24} md={12} lg={8} xl={6}>
            <div>
              <Button onClick={handleClickBtnAddCategory} className='full-width' type='primary'>
                Add category
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className='mt-10'>
        <Row gutter={[20, 20]}>
          {categories.map((category) => (
            <Col key={category.id} xs={24} md={12} lg={8} xl={6}>
              <CategoryItem category={category} />
            </Col>
          ))}
        </Row>
      </div>
      <div className=''>
        <ModalSaveCategory />
        <ModalCategoryConfirm />
      </div>
    </CardCustom>
  );
};
export default LevelDetail;
