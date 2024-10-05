/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { IGroupRole } from "@/types/groupRole/GroupRoleType";
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
export const questionThunks = {
  getAllQuestions,
};

export default questionThunks;
