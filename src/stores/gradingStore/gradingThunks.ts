/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import {
  ICheckRegisterGradingWithPersonRequest,
  ICheckRegisterGradingWithPersonResponse,
  IGetGradingFeedbackWithExaminerResponse,
  IGradeExamWithPersonRequest,
  IGradeQuestionWithPersonRequest,
  IGradingFeedbackQuestion,
  IRegisteredGradingExam,
} from "@/types/gradingFeedback/GradingFeedbackType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const gradingWritingWithAI = createAsyncThunk(
  "grades/gradingWritingWithAI",
  async (
    examId: string,
    { rejectWithValue }
  ): Promise<IAppResposeBase<null>> => {
    try {
      const grades: IAppResposeBase<null> = await http.post(
        "/api/grades/grade-writing-with-ai",
        {
          examId,
        }
      );
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getGradingFeedbackWithAI = createAsyncThunk(
  "grades/getGradingFeedbackWithAI",
  async (
    { examId, skill }: { examId: string; skill: "writing" | "speaking" },
    { rejectWithValue }
  ): Promise<IAppResposeBase<IGradingFeedbackQuestion[]>> => {
    try {
      const grades: IAppResposeBase<IGradingFeedbackQuestion[]> =
        await http.get(
          `/api/grades/grading-feedback-with-ai/${examId}?skill=${skill}`
        );
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const registerGradingExamWithPerson = createAsyncThunk(
  "grades/registerGradingExamWithPerson",
  async (data: IGradeExamWithPersonRequest, { rejectWithValue }) => {
    try {
      const grades: IAppResposeBase<IRegisteredGradingExam> = await http.post(
        "/api/grades/register-grading-exam-with-person",
        data
      );
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const checkRegisterGradingExamWithPerson = createAsyncThunk(
  "grades/checkRegisterGradingExamWithPerson",
  async (data: ICheckRegisterGradingWithPersonRequest, { rejectWithValue }) => {
    try {
      const grades: IAppResposeBase<ICheckRegisterGradingWithPersonResponse> =
        await http.post("/api/grades/check-registered-with-person", data);
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getListRegisteredGradeExamByExaminer = createAsyncThunk(
  "grades/getListRegisteredGradeExamByExaminer",
  async (examinerId: string, { rejectWithValue }) => {
    try {
      const grades: IAppResposeBase<IRegisteredGradingExam[]> = await http.get(
        `/api/grades/get-list-registered-grade-exam-by-examiner/${examinerId}`
      );
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getGradingFeedbackWithPerson = createAsyncThunk(
  "grades/getGradingFeedbackWithPerson",
  async (registerGradeExamId: string, { rejectWithValue }) => {
    try {
      const grades: IAppResposeBase<IGetGradingFeedbackWithExaminerResponse> =
        await http.get(
          `/api/grades/grading-feedback-with-examiner/${registerGradeExamId}`
        );
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const gradeQuestionWithPerson = createAsyncThunk(
  "grades/gradeQuestionWithPerson",
  async (data: IGradeQuestionWithPersonRequest, { rejectWithValue }) => {
    try {
      const grades: IAppResposeBase<null> = await http.post(
        "/api/grades/grade-question-with-person",
        data
      );
      return grades;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const GradingThunks = {
  gradingWritingWithAI,
  getGradingFeedbackWithAI,
  registerGradingExamWithPerson,
  checkRegisterGradingExamWithPerson,
  getListRegisteredGradeExamByExaminer,
  getGradingFeedbackWithPerson,
  gradeQuestionWithPerson,
};
export default GradingThunks;
