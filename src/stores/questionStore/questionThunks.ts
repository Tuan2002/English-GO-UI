/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { IGroupRole } from "@/types/groupRole/GroupRoleType";
import { IQuestion, IQuestionDetail } from "@/types/question/QuestionTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllQuestions = createAsyncThunk(
  "questions/getAllQuestions",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IGroupRole[] | null>> => {
    try {
      const groupRoles: IAppResposeBase<IGroupRole[]> = await http.get("/api/auth/get-group-roles");
      return groupRoles;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const createNewQuestion = createAsyncThunk(
  "questions/createNewQuestion",
  async (dataCreate: IQuestionDetail[], { rejectWithValue }): Promise<IAppResposeBase<IQuestion | null>> => {
    try {
      const question: IAppResposeBase<IQuestion> = await http.post("/api/questions/create-question", dataCreate);
      return question;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (dataUpdate: IQuestionDetail, { rejectWithValue }): Promise<IAppResposeBase<IQuestion | null>> => {
    try {
      const question: IAppResposeBase<IQuestion> = await http.put("/api/questions/update-question", dataUpdate);
      return question;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getQuestionByCategory = createAsyncThunk(
  "questions/getQuestionByCategory",
  async (
    { categoryId, status = "all" }: { categoryId: string; status: string },
    { rejectWithValue }
  ): Promise<IAppResposeBase<IQuestion[] | null>> => {
    try {
      const questions: IAppResposeBase<IQuestion[]> = await http.get(
        `/api/questions/get-questions-by-category/${categoryId}?status=${status}`
      );
      return questions;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getQuestionDetail = createAsyncThunk(
  "questions/getQuestionDetail",
  async (questionId: string, { rejectWithValue }): Promise<IAppResposeBase<IQuestionDetail | null>> => {
    try {
      const question: IAppResposeBase<IQuestionDetail> = await http.get(`/api/questions/get-question-detail/${questionId}`);
      return question;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId: string, { rejectWithValue }): Promise<IAppResposeBase<IQuestion | null>> => {
    try {
      const question: IAppResposeBase<IQuestion> = await http.delete(`/api/questions/delete-question/${questionId}`);
      return question;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const restoreQuestion = createAsyncThunk(
  "questions/restoreQuestion",
  async (questionId: string, { rejectWithValue }): Promise<IAppResposeBase<IQuestion | null>> => {
    try {
      const question: IAppResposeBase<IQuestion> = await http.put(`/api/questions/restore-question/${questionId}`);
      return question;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const activeQuestion = createAsyncThunk(
  "questions/activeQuestion",
  async (questionId: string, { rejectWithValue }): Promise<IAppResposeBase<IQuestion | null>> => {
    try {
      const question: IAppResposeBase<IQuestion> = await http.put(`/api/questions/active-question/${questionId}`);
      return question;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const inactiveQuestion = createAsyncThunk(
  "questions/inactiveQuestion",
  async (questionId: string, { rejectWithValue }): Promise<IAppResposeBase<IQuestion | null>> => {
    try {
      const question: IAppResposeBase<IQuestion> = await http.put(`/api/questions/inactive-question/${questionId}`);
      return question;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const deleteQuestionPermanently = createAsyncThunk(
  "questions/deleteQuestionPermanently",
  async (questionId: string, { rejectWithValue }): Promise<IAppResposeBase<IQuestion | null>> => {
    try {
      const question: IAppResposeBase<IQuestion> = await http.delete(`/api/questions/delete-question-permanently/${questionId}`);
      return question;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

export const questionThunks = {
  getAllQuestions,
  createNewQuestion,
  updateQuestion,
  getQuestionByCategory,
  getQuestionDetail,
  deleteQuestion,
  restoreQuestion,
  activeQuestion,
  inactiveQuestion,
  deleteQuestionPermanently,
};

export default questionThunks;
