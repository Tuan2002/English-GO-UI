/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { IExaminerIntroduction, IExaminerWithIntroduction } from "@/types/examinerIntroduction/ExaminerIntroductionTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllExaminerIntroduction = createAsyncThunk(
  "examinerIntroductions/getAllExaminerIntroduction",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IExaminerWithIntroduction[]>> => {
    try {
      const examinerIntroductions: IAppResposeBase<IExaminerWithIntroduction[]> = await http.get(
        "/api/examiner-introductions/get-all-examiners"
      );
      return examinerIntroductions;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getMyIntroduction = createAsyncThunk(
  "examinerIntroductions/getMyIntroduction",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IExaminerIntroduction>> => {
    try {
      const examinerIntroductions: IAppResposeBase<IExaminerIntroduction> = await http.get(
        "/api/examiner-introductions/get-my-introduction"
      );
      return examinerIntroductions;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const updateMyIntroduction = createAsyncThunk(
  "examinerIntroductions/updateMyIntroduction",
  async (data: IExaminerIntroduction, { rejectWithValue }): Promise<IAppResposeBase<IExaminerIntroduction>> => {
    try {
      const examinerIntroductions: IAppResposeBase<IExaminerIntroduction> = await http.put(
        "/api/examiner-introductions/update-my-introduction",
        data
      );
      return examinerIntroductions;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const examinerIntroductionThunks = {
  getMyIntroduction,
  updateMyIntroduction,
  getAllExaminerIntroduction,
};
export default examinerIntroductionThunks;
