/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { ICheckPoint, IExamTrackingRequest, IGetExamSessionResponse } from "@/types/lookup/LookupTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getExamSessions = createAsyncThunk(
  "checkpoints/getExamSessions",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IGetExamSessionResponse | null>> => {
    try {
      const categories: IAppResposeBase<IGetExamSessionResponse> = await http.get(`/api/tracking/exam-sessions`);
      return categories;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getExamResults = createAsyncThunk(
  "checkpoints/getExamResults",
  async (data: IExamTrackingRequest, { rejectWithValue }): Promise<IAppResposeBase<ICheckPoint[] | null>> => {
    try {
      const categories: IAppResposeBase<ICheckPoint[]> = await http.post(`/api/tracking/exam-results`, data);
      return categories;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const checkpointThunks = {
  getExamSessions,
  getExamResults,
};
export default checkpointThunks;
