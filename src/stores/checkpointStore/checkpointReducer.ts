import { ICheckPoint, IExamSession } from "@/types/lookup/LookupTypes";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import checkpointThunks from "./checkpointThunks";

export interface CheckPointState {
  loading: boolean;
  checkpoints?: ICheckPoint[];
  examSessions: IExamSession[];
  signature?: string;
  isSubmitted: boolean;
}

const initialState: CheckPointState = {
  loading: false,
  checkpoints: [],
  examSessions: [],
  signature: "",
  isSubmitted: false,
};

export const CheckPointSlice = createSlice({
  name: "checkpoints",
  initialState,
  reducers: {
    changeIsLoading: (state, action) => {
      state.loading = action.payload;
    },
    changeIsSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    changeSignature: (state, action) => {
      state.signature = action.payload;
    },
    changeCheckpoints: (state, action) => {
      state.checkpoints = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkpointThunks.getExamSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkpointThunks.getExamSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.examSessions = action.payload.data?.examSessions || [];
        state.signature = action.payload.data?.signature || "";
      })
      .addCase(checkpointThunks.getExamSessions.rejected, (state) => {
        state.loading = false;
        state.examSessions = [];
        state.signature = "";
      });

    builder
      .addCase(checkpointThunks.getExamResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkpointThunks.getExamResults.fulfilled, (state, action) => {
        state.loading = false;
        state.checkpoints = action.payload.data || [];
        state.isSubmitted = true;
      })
      .addCase(checkpointThunks.getExamResults.rejected, (state) => {
        state.loading = false;
        state.checkpoints = [];
        toast.error("Tra cứu điểm thi thất bại, vui lòng thử lại sau!");
      });
  },
});

// Action creators are generated for each case reducer function
export const CheckPointActions = {
  ...CheckPointSlice.actions,
  ...checkpointThunks,
};

export default CheckPointSlice.reducer;
