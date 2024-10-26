/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { IContinueExamResponse, IExam, ISubmitSkillRequest } from "@/types/exam/ExamTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const participateExam = createAsyncThunk(
  "exams/participateExam",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IExam | null>> => {
    try {
      const user: IAppResposeBase<IExam> = await http.post("/api/exams/participate-exam");
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getCurrentExam = createAsyncThunk(
  "exams/getCurrentExam",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IExam | null>> => {
    try {
      const user: IAppResposeBase<IExam> = await http.get("/api/exams/current-exam");
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const continueExam = createAsyncThunk(
  "exams/continueExam",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IContinueExamResponse | null>> => {
    try {
      const exam: IAppResposeBase<IContinueExamResponse> = await http.post("/api/exams/continue-exam");
      return exam;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const submitSkill = createAsyncThunk(
  "exams/submitSkill",
  async (data: ISubmitSkillRequest, { rejectWithValue }): Promise<IAppResposeBase<IContinueExamResponse | null>> => {
    try {
      const exam: IAppResposeBase<IContinueExamResponse> = await http.post("/api/exams/submit-skill", data);
      return exam;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

export const examThunks = {
  participateExam,
  getCurrentExam,
  continueExam,
  submitSkill,
};
