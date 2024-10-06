/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { IGroupRole } from "@/types/groupRole/GroupRoleType";
import { IQuestion, IQuestionData } from "@/types/question/QuestionTypes";
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
  async (dataCreate: IQuestionData, { rejectWithValue }): Promise<IAppResposeBase<IQuestion | null>> => {
    try {
      const question: IAppResposeBase<IQuestion> = await http.post("/api/questions/create-question", dataCreate);
      console.log(question);
      return question;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data) as any;
    }
  }
);
export const questionThunks = {
  getAllQuestions,
  createNewQuestion,
};

export default questionThunks;
