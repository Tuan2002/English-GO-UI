/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFeedback } from "@/types/feedback/FeedbackTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import feedbackThunks from "./feedbackThunks";
import { toast } from "react-toastify";
import { IPaginationData } from "@/types/AppType";

export interface FeedbackState {
  feedbacks: IFeedback[];
  isSubmiting: boolean;
  isLoading?: boolean;
  feedbackPaginationData?: IPaginationData;
  openModalShowFeedback: boolean;
  currentFeedback?: IFeedback;
}

const initialState: FeedbackState = {
  feedbacks: [],
  isSubmiting: false,
  isLoading: false,
  openModalShowFeedback: false,
  currentFeedback: undefined,
};

export const FeedbackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {
    changeIsSubmiting: (state, action: PayloadAction<boolean>) => {
      state.isSubmiting = action.payload;
    },
    changeOpenModalShowFeedback: (state, action: PayloadAction<boolean>) => {
      state.openModalShowFeedback = action.payload;
    },
    changeCurrentFeedback: (state, action: PayloadAction<IFeedback>) => {
      state.currentFeedback = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(feedbackThunks.sendFeedback.pending, (state) => {
        state.isSubmiting = true;
      })
      .addCase(feedbackThunks.sendFeedback.fulfilled, (state, action) => {
        state.isSubmiting = false;
        console.log(action.payload);
        toast.success(action.payload.message);
      })
      .addCase(feedbackThunks.sendFeedback.rejected, (state, action) => {
        state.isSubmiting = false;
        console.log(action.payload);
        toast.error((action.payload as { message: string })?.message);
      });
    builder
      .addCase(feedbackThunks.getAllFeedbacks.pending, (state) => {
        state.isSubmiting = true;
      })
      .addCase(feedbackThunks.getAllFeedbacks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedbacks = action.payload.data.items;
        state.feedbackPaginationData = {
          page: action.payload.data.currentPage,
          limit: action.payload.data.limit,
          totalItems: action.payload.data.totalItems,
          totalPages: action.payload.data.totalPages,
        };
      })
      .addCase(feedbackThunks.getAllFeedbacks.rejected, (state, action) => {
        state.isSubmiting = false;
        console.log(action.payload);
        toast.error((action.payload as { message: string })?.message);
      });
  },
});

// Action creators are generated for each case reducer function
export const FeedbackActions = {
  ...FeedbackSlice.actions,
  ...feedbackThunks,
};

export default FeedbackSlice.reducer;
