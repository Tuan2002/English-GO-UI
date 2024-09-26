import { IAppResposeBase } from "@/types/AppType";
import { IMemberCount } from "@/types/memberCount/MemberCountType";
import { IProvince } from "@/types/province/ProvinceType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getProvinces = createAsyncThunk(
  "general/getProvinces",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IProvince[]>> => {
    try {
      const provinces: IAppResposeBase<IProvince[]> = await http.get("/api/provinces/get-provincies");
      return provinces;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getMemberCounts = createAsyncThunk("general/getMemberCounts", async (_, { rejectWithValue }) => {
  try {
    const memberCounts: IAppResposeBase<IMemberCount[]> = await http.get("/api/member-counts/get-member-counts");
    return memberCounts;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as any;
  }
});

export const generalThunks = {
  getProvinces,
  getMemberCounts,
};
