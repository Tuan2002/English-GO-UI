import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "@/types/category/CategoryTypes";
import categoryThunks from "./categoryThunks";
import { toast } from "react-toastify";

export interface AppState {
  loading: boolean;
  categories: ICategory[];
  selectedCategory?: ICategory;
  actionModal: "create" | "update" | "delete" | "restore" | "active" | "inactive";
  openModalSaveCategory: boolean;
  openModalConfirm: boolean;
  isSubmitting: boolean;
}

const initialState: AppState = {
  loading: false,
  categories: [],
  selectedCategory: undefined,
  openModalSaveCategory: false,
  openModalConfirm: false,
  actionModal: "create",
  isSubmitting: false,
};

export const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    changeSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    changeOpenModalSaveCategory: (state, action) => {
      state.openModalSaveCategory = action.payload;
    },
    changeOpenModalConfirm: (state, action) => {
      state.openModalConfirm = action.payload;
    },
    changeActionModal: (state, action) => {
      state.actionModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryThunks.getAllCategoryOfLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryThunks.getAllCategoryOfLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data || [];
      })
      .addCase(categoryThunks.getAllCategoryOfLevel.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(categoryThunks.createNewCategory.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(categoryThunks.createNewCategory.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveCategory = false;
        state.selectedCategory = undefined;
        state.actionModal = "create";
        state.categories.unshift(action.payload.data as ICategory);
        toast.success(action.payload.message);
      })
      .addCase(categoryThunks.createNewCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(categoryThunks.updateCategory.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(categoryThunks.updateCategory.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveCategory = false;
        state.selectedCategory = undefined;
        state.actionModal = "create";
        state.categories = state.categories.map((category) => {
          if (category.id === action.payload.data?.id) {
            return action.payload.data as ICategory;
          }
          return category;
        });
        toast.success(action.payload.message);
      })
      .addCase(categoryThunks.updateCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(categoryThunks.deleteCategory.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(categoryThunks.deleteCategory.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalConfirm = false;
        state.selectedCategory = undefined;
        state.actionModal = "create";
        state.categories = state.categories.filter((category) => category.id !== action.payload.data?.id);
        toast.success(action.payload.message);
      })
      .addCase(categoryThunks.deleteCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(categoryThunks.restoreCategory.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(categoryThunks.restoreCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) => {
          if (category.id === action.payload.data?.id) {
            return action.payload.data as ICategory;
          }
          return category;
        });
        state.isSubmitting = false;
        state.openModalConfirm = false;
        state.selectedCategory = undefined;
        state.actionModal = "create";
        toast.success(action.payload.message);
      })
      .addCase(categoryThunks.restoreCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(categoryThunks.activeCategory.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(categoryThunks.activeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) => {
          if (category.id === action.payload.data?.id) {
            return action.payload.data as ICategory;
          }
          return category;
        });
        state.isSubmitting = false;
        state.openModalConfirm = false;
        state.selectedCategory = undefined;
        state.actionModal = "create";
        toast.success(action.payload.message);
      })
      .addCase(categoryThunks.activeCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
    builder
      .addCase(categoryThunks.inactiveCategory.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(categoryThunks.inactiveCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) => {
          if (category.id === action.payload.data?.id) {
            return action.payload.data as ICategory;
          }
          return category;
        });
        state.isSubmitting = false;
        state.openModalConfirm = false;
        state.selectedCategory = undefined;
        state.actionModal = "create";
        toast.success(action.payload.message);
      })
      .addCase(categoryThunks.inactiveCategory.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.message);
      });
  },
});

// Action creators are generated for each case reducer function
export const CategoryAction = {
  ...CategorySlice.actions,
  ...categoryThunks,
};

export default CategorySlice.reducer;
