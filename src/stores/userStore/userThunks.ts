import { IAppResposeBase, IFilterPayload } from "@/types/AppType";
import { ICreateUserPayload, IGetUserDataResponse, IUserData } from "@/types/user/UserType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (payload: IFilterPayload, { rejectWithValue }): Promise<IAppResposeBase<IGetUserDataResponse>> => {
    try {
      const { page, limit } = payload;
      const user: IAppResposeBase<IGetUserDataResponse> = await http.get(`/api/users/get-users?page=${page}&limit=${limit}`);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const createNewUser = createAsyncThunk(
  "user/createNewUser",
  async (
    payload: {
      data: ICreateUserPayload;
      callback?: () => void;
    },
    { rejectWithValue }
  ): Promise<IAppResposeBase<IUserData>> => {
    try {
      const userCreated: IAppResposeBase<IUserData> = await http.post("/api/users/create-user", payload.data);
      if (payload.callback) {
        payload.callback();
      }
      return userCreated;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const deleteUser = createAsyncThunk("user/deleteUser", async (id: string, { rejectWithValue }) => {
  try {
    const userDeleted: IAppResposeBase<null> = await http.delete(`/api/users/delete-user/${id}`);
    return userDeleted;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as any;
  }
});
const restoreUser = createAsyncThunk("user/restoreUser", async (id: string, { rejectWithValue }) => {
  try {
    const userRestored: IAppResposeBase<null> = await http.put(`/api/users/restore-user/${id}`);
    return userRestored;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as any;
  }
});
const blockUser = createAsyncThunk("user/blockUser", async (id: string, { rejectWithValue }) => {
  try {
    const userBlocked: IAppResposeBase<null> = await http.put(`/api/users/block-user/${id}`);
    return userBlocked;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as any;
  }
});
const unBlockUser = createAsyncThunk("user/unBlockUser", async (id: string, { rejectWithValue }) => {
  try {
    const userUnBlocked: IAppResposeBase<null> = await http.put(`/api/users/unblock-user/${id}`);
    return userUnBlocked;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as any;
  }
});

const userThunks = {
  getAllUsers,
  createNewUser,
  deleteUser,
  restoreUser,
  blockUser,
  unBlockUser,
};
export default userThunks;
