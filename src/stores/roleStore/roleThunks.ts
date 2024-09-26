import { IAppResposeBase } from "@/types/AppType";
import { IGroupRole } from "@/types/groupRole/GroupRoleType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllGroupRoles = createAsyncThunk(
  "role/getAllGroupRoles",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IGroupRole[] | null>> => {
    try {
      const groupRoles: IAppResposeBase<IGroupRole[]> = await http.get("/api/auth/get-group-roles");
      return groupRoles;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
export const roleThunks = {
  getAllGroupRoles,
};

export default roleThunks;
