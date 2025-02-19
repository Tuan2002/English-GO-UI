/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResponseWithPagination, IAppResposeBase } from "@/types/AppType";
import { IEvaluate, IGetAllEvaluateDTO, ISendIvaluateDTO } from "@/types/evaluate/EvaluateTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const sendEvaluate = createAsyncThunk(
  "evaluates/sendEvaluate",
  async (evaluate: ISendIvaluateDTO, { rejectWithValue }): Promise<IAppResposeBase<IEvaluate>> => {
    try {
      const response: IAppResposeBase<IEvaluate> = await http.post("/api/evaluates/send-evaluate", evaluate);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getAllEvaluates = createAsyncThunk(
  "evaluates/getAllEvaluates",
  async (data: IGetAllEvaluateDTO, { rejectWithValue }): Promise<IAppResponseWithPagination<IEvaluate>> => {
    try {
      const response: IAppResponseWithPagination<IEvaluate> = await http.get(
        `/api/evaluates/get-evaluates?page=${data.page ?? 1}&${data.limit && "limit=" + data.limit}&${
          data.isShow !== undefined && "isShow=" + data.isShow
        }`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const toogleShowEvaluate = createAsyncThunk(
  "evaluates/toogleShowEvaluate",
  async (id: string, { rejectWithValue }): Promise<IAppResposeBase<IEvaluate>> => {
    try {
      const response: IAppResposeBase<IEvaluate> = await http.put(`/api/evaluates/toogle-show-evaluate/${id}`);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const evaluateThunks = {
  sendEvaluate,
  getAllEvaluates,
  toogleShowEvaluate,
};
export default evaluateThunks;
