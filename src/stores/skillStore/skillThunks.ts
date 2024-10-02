/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { ISkill, ISkillDataUpdate } from "@/types/skill/SkillType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllSkills = createAsyncThunk(
  "skills/getAllSkills",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<ISkill[]>> => {
    try {
      const skills: IAppResposeBase<ISkill[]> = await http.get("/api/skills/get-skills");
      return skills;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async (skillData: ISkillDataUpdate, { rejectWithValue }): Promise<IAppResposeBase<ISkill>> => {
    try {
      const skill: IAppResposeBase<ISkill> = await http.put(`/api/skills/update-skill/${skillData.skillId}`, skillData);
      return skill;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getSkillById = createAsyncThunk(
  "skills/getSkillById",
  async (skillId: string, { rejectWithValue }): Promise<IAppResposeBase<ISkill>> => {
    try {
      const skill: IAppResposeBase<ISkill> = await http.get(`/api/skills/get-skill/${skillId}`);
      return skill;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const skillThunks = {
  getAllSkills,
  updateSkill,
  getSkillById,
};
export default skillThunks;
