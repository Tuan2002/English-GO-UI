import { IAppResposeBase } from "@/types/AppType";
import { ISkill } from "@/types/skill/SkillType";
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

const skillThunks = {
  getAllSkills,
};
export default skillThunks;
