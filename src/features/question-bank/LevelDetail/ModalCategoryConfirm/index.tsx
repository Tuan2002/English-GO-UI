/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { RootState } from "@/stores";
import { CategoryAction } from "@/stores/categoryStore/categoryReducer";
import { useDispatch, useSelector } from "react-redux";

const ModalCategoryConfirm = () => {
  const { selectedCategory, openModalConfirm, actionModal, isSubmitting } = useSelector(
    (state: RootState) => state.categoryStore
  );
  const dispatch = useDispatch();
  const handleConfirm = () => {
    if (actionModal === "delete") {
      dispatch<any>(CategoryAction.deleteCategory(selectedCategory?.id ?? ""));
    }
    if (actionModal === "active") {
      dispatch<any>(CategoryAction.activeCategory(selectedCategory?.id ?? ""));
    }
    if (actionModal === "inactive") {
      dispatch<any>(CategoryAction.inactiveCategory(selectedCategory?.id ?? ""));
    }
    if (actionModal === "restore") {
      dispatch<any>(CategoryAction.restoreCategory(selectedCategory?.id ?? ""));
    }
  };
  const handleCancel = () => {
    dispatch(CategoryAction.changeOpenModalConfirm(false));
    dispatch(CategoryAction.changeSelectedCategory(undefined));
    dispatch(CategoryAction.changeActionModal("create"));
  };
  return (
    <ModalConfirm
      isLoading={isSubmitting}
      open={openModalConfirm}
      onOK={handleConfirm}
      onCancel={handleCancel}
      modalTitle={selectedCategory?.name ?? "Confirm Modal"}
      confirmText={`Are you sure you want to ${actionModal} this category?`}
    />
  );
};
export default ModalCategoryConfirm;
