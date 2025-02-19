import { IPlanAttribute, IPlanType } from "@/types/plan/PlanTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import planThunks from "./planThunks";
export interface PlanState {
  listPlanTypes: IPlanType[];
  planAttributeData: IPlanAttribute | null;
  listGeneralPlanAttributes: IPlanAttribute[];

  loading: boolean;
  isSubmitting: boolean;
  openModalSaveServiceAttribute: boolean;
  openModalSaveServiceType: boolean;
  actionModal: "create" | "update";
}

const initialState: PlanState = {
  listPlanTypes: [],
  loading: false,
  isSubmitting: false,
  planAttributeData: null,
  openModalSaveServiceAttribute: false,
  openModalSaveServiceType: false,
  listGeneralPlanAttributes: [],
  actionModal: "create",
};

export const PlanSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    changeIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    changeOpenModalSaveServiceAttribute: (state, action: PayloadAction<boolean>) => {
      state.openModalSaveServiceAttribute = action.payload;
    },
    changeOpenModalSaveServiceType: (state, action: PayloadAction<boolean>) => {
      state.openModalSaveServiceType = action.payload;
    },
    setListPlanTypes: (state, action: PayloadAction<IPlanType[]>) => {
      state.listPlanTypes = action.payload;
    },
    changeActionModal: (state, action: PayloadAction<"create" | "update">) => {
      state.actionModal = action.payload;
    },
    setPlanAttributeData: (state, action: PayloadAction<IPlanAttribute | null>) => {
      state.planAttributeData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(planThunks.getAllPlanTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(planThunks.getAllPlanTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.listPlanTypes = action.payload.data;
      })
      .addCase(planThunks.getAllPlanTypes.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(planThunks.createNewPlanAttributes.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(planThunks.createNewPlanAttributes.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listGeneralPlanAttributes.push(...action.payload.data);
        state.openModalSaveServiceAttribute = false;
        toast.success("Thêm thuộc tính thành công");
      })
      .addCase(planThunks.createNewPlanAttributes.rejected, (state) => {
        state.isSubmitting = false;
      });
    builder
      .addCase(planThunks.updatePlanAttribute.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(planThunks.updatePlanAttribute.fulfilled, (state, action) => {
        state.isSubmitting = false;
        const index = state.listGeneralPlanAttributes.findIndex((item) => item.id === action.payload.data.id);
        if (index !== -1) {
          state.listGeneralPlanAttributes[index] = action.payload.data;
        }
        state.openModalSaveServiceAttribute = false;
        toast.success("Cập nhật thuộc tính thành công");
      })
      .addCase(planThunks.updatePlanAttribute.rejected, (state) => {
        state.isSubmitting = false;
      });
    builder
      .addCase(planThunks.createNewPlanType.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(planThunks.createNewPlanType.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listPlanTypes.push(action.payload.data);
        state.openModalSaveServiceType = false;
        toast.success("Thêm loại dịch vụ thành công");
      })
      .addCase(planThunks.createNewPlanType.rejected, (state) => {
        state.isSubmitting = false;
      });
    builder
      .addCase(planThunks.getGeneralPlanAttributes.pending, (state) => {
        state.loading = true;
      })
      .addCase(planThunks.getGeneralPlanAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.listGeneralPlanAttributes = action.payload.data;
      })
      .addCase(planThunks.getGeneralPlanAttributes.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(planThunks.deletePlanAttribute.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(planThunks.deletePlanAttribute.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listGeneralPlanAttributes = state.listGeneralPlanAttributes.filter((item) => item.id !== action.payload.data.id);
        toast.success("Xóa thuộc tính thành công");
      })
      .addCase(planThunks.deletePlanAttribute.rejected, (state) => {
        state.isSubmitting = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const PlanActions = {
  ...PlanSlice.actions,
  ...planThunks,
};

export default PlanSlice.reducer;
