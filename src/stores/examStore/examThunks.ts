/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import {
  IContinueExamResponse,
  ICurrentExamResponse,
  IExam,
  IExamScore,
  IQuestionResultResponse,
  ISpeakingQuestionSubmit,
  ISubmitSkillRequest,
} from "@/types/exam/ExamTypes";
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
  async (_, { rejectWithValue }): Promise<IAppResposeBase<ICurrentExamResponse | null>> => {
    try {
      const user: IAppResposeBase<ICurrentExamResponse> = await http.get("/api/exams/current-exam");
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
const submitSpeakingSkill = createAsyncThunk(
  "exams/submitSpeakingSkill",
  async (data: ISpeakingQuestionSubmit, { rejectWithValue }): Promise<IAppResposeBase<IContinueExamResponse | null>> => {
    try {
      const exam: IAppResposeBase<IContinueExamResponse> = await http.post("/api/exams/submit-speaking-skill", data);
      return exam;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getCurrentSpeakingQuestion = createAsyncThunk(
  "exams/getCurrentSpeakingQuestion",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<string | null>> => {
    try {
      const exam: IAppResposeBase<string> = await http.get("/api/exams/current-speaking-question");
      return exam;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getExamScore = createAsyncThunk(
  "exams/getExamScore",
  async (examId: string, { rejectWithValue }): Promise<IAppResposeBase<IExamScore | null>> => {
    try {
      const exam: IAppResposeBase<IExamScore> = await http.get(`/api/exams/get-score/${examId}`);
      return exam;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getResultOfExam = createAsyncThunk(
  "exams/getResultOfExam",
  async (
    { examId, skillId }: { examId: string; skillId: string },
    { rejectWithValue }
  ): Promise<IAppResposeBase<IQuestionResultResponse | null>> => {
    try {
      const exam: IAppResposeBase<IQuestionResultResponse> = await http.get(`/api/exams/get-result/${examId}?skillId=${skillId}`);
      return exam;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getMyExams = createAsyncThunk(
  "exams/getMyExams",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IExamScore[] | null>> => {
    try {
      const exam: IAppResposeBase<IExamScore[]> = await http.get("/api/exams/my-exams");
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
  submitSpeakingSkill,
  getCurrentSpeakingQuestion,
  getExamScore,
  getResultOfExam,
  getMyExams,
};
