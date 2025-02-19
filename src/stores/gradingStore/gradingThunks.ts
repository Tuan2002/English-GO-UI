/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { ILevel, ILevelDataUpdate } from "@/types/level/LevelTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllLevels = createAsyncThunk(
  "levels/getAllLevels",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<ILevel[]>> => {
    try {
      const levels: IAppResposeBase<ILevel[]> = await http.get("/api/levels/get-levels");
      return levels;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const updateLevel = createAsyncThunk(
  "levels/updateLevel",
  async (levelData: ILevelDataUpdate, { rejectWithValue }): Promise<IAppResposeBase<ILevel>> => {
    try {
      const level: IAppResposeBase<ILevel> = await http.put(`/api/levels/update-level/${levelData.levelId}`, levelData);
      return level;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getLevelById = createAsyncThunk(
  "levels/getLevelById",
  async (levelId: string, { rejectWithValue }): Promise<IAppResposeBase<ILevel>> => {
    try {
      const level: IAppResposeBase<ILevel> = await http.get(`/api/levels/get-level/${levelId}`);
      return level;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getLevelOfSkill = createAsyncThunk(
  "levels/getLevelOfSkill",
  async (skillId: string, { rejectWithValue }): Promise<IAppResposeBase<ILevel[]>> => {
    try {
      const levels: IAppResposeBase<ILevel[]> = await http.get(`/api/levels/get-level-of-skill/${skillId}`);
      return levels;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const levelThunks = {
  getAllLevels,
  updateLevel,
  getLevelById,
  getLevelOfSkill,
};
export default levelThunks;
