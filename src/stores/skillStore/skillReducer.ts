import { createSlice } from "@reduxjs/toolkit";
import { ISkill } from "@/types/skill/SkillType";
import skillThunks from "./skillThunks";

export interface SkillState {
  loading: boolean;
  listSkill: ISkill[];
}

const initialState: SkillState = {
  loading: false,
  listSkill: [],
};

export const SkillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(skillThunks.getAllSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(skillThunks.getAllSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.listSkill = action.payload.data;
      })
      .addCase(skillThunks.getAllSkills.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const SkillActions = {
  ...SkillSlice.actions,
  ...skillThunks,
};

export default SkillSlice.reducer;
