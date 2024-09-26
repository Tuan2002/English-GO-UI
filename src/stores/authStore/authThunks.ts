import { IAppResposeBase } from "@/types/AppType";
import { ICurrentUser } from "@/types/auth/AuthType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<ICurrentUser | null>> => {
    try {
      const user: IAppResposeBase<ICurrentUser> = await http.get("/api/auth/get-me");
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const firstUpdateProfile = createAsyncThunk(
  "auth/firstUpdateProfile",
  async (payload: any, { rejectWithValue }): Promise<IAppResposeBase<ICurrentUser | null>> => {
    try {
      const user: IAppResposeBase<ICurrentUser> = await http.put("/api/auth/update-my-profile", payload);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

export const authThunks = {
  getCurrentUser,
  firstUpdateProfile,
};
