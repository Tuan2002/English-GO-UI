/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResponseWithPagination, IAppResposeBase } from "@/types/AppType";
import { IFeedback, IGetAllFeedbackDTO, ISendFeedbackData } from "@/types/feedback/FeedbackTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const sendFeedback = createAsyncThunk(
  "feedbacks/sendFeedback",
  async (feedback: ISendFeedbackData, { rejectWithValue }): Promise<IAppResposeBase<IFeedback>> => {
    try {
      const newFeedback: IAppResposeBase<IFeedback> = await http.post("/api/feedbacks/send-feedback", feedback);
      return newFeedback;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getAllFeedbacks = createAsyncThunk(
  "feedbacks/getAllFeedbacks",
  async (data: IGetAllFeedbackDTO, { rejectWithValue }): Promise<IAppResponseWithPagination<IFeedback>> => {
    try {
      const exam: IAppResponseWithPagination<IFeedback> = await http.get(
        `/api/feedbacks/get-feedbacks?page=${data.page ?? 1}&${data.limit && "limit=" + data.limit}&${
          data.search && data.search?.trim() !== "" && "search=" + data.search
        }`
      );
      return exam;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const feedbackThunks = {
  sendFeedback,
  getAllFeedbacks,
};
export default feedbackThunks;
