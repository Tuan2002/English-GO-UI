/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { examThunks } from "./examThunks";
import { toast } from "react-toastify";
import { IExam } from "../../types/exam/ExamTypes";

export interface ExamState {
  currentExam?: IExam;
  isSubmitting: boolean;
  isLoading: boolean;
}

const initialState: ExamState = {
  currentExam: undefined,
  isSubmitting: false,
  isLoading: false,
};

export const ExamSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    changeIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(examThunks.participateExam.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(examThunks.participateExam.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(examThunks.participateExam.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.errorMessage);
      });
    builder
      .addCase(examThunks.getCurrentExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(examThunks.getCurrentExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentExam = action.payload.data as IExam;
      })
      .addCase(examThunks.getCurrentExam.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const ExamActions = {
  ...ExamSlice.actions,
  ...examThunks,
};

export default ExamSlice.reducer;
