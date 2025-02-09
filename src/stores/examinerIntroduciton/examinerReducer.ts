/* eslint-disable @typescript-eslint/no-explicit-any */
import { IExaminerIntroduction } from "@/types/examinerIntroduction/ExaminerIntroductionTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import examinerIntroductionThunks from "./examinerThunks";
import { toast } from "react-toastify";

export interface ExaminerIntroductionState {
  loading: boolean;
  isSubmitting: boolean;
  myExaminerIntroduction: IExaminerIntroduction | null;
}

const initialState: ExaminerIntroductionState = {
  loading: false,
  isSubmitting: false,
  myExaminerIntroduction: null,
};

export const ExaminerIntroductionSlice = createSlice({
  name: "examinerIntroduction",
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    changeIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    changeMyExaminerIntroduction: (state, action: PayloadAction<IExaminerIntroduction>) => {
      state.myExaminerIntroduction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(examinerIntroductionThunks.getMyIntroduction.pending, (state) => {
        state.loading = true;
      })
      .addCase(examinerIntroductionThunks.getMyIntroduction.fulfilled, (state, action) => {
        state.loading = false;
        state.myExaminerIntroduction = action.payload.data;
      })
      .addCase(examinerIntroductionThunks.getMyIntroduction.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(examinerIntroductionThunks.updateMyIntroduction.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(examinerIntroductionThunks.updateMyIntroduction.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.myExaminerIntroduction = action.payload.data;
        toast.success("Cập nhật thông tin giới thiệu thành công!");
      })
      .addCase(examinerIntroductionThunks.updateMyIntroduction.rejected, (state) => {
        state.isSubmitting = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const ExaminerIntroductionActions = {
  ...ExaminerIntroductionSlice.actions,
  ...examinerIntroductionThunks,
};

export default ExaminerIntroductionSlice.reducer;
