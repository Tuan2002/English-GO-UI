/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISkill } from "@/types/skill/SkillType";
import skillThunks from "./skillThunks";
import { toast } from "react-toastify";

export interface SkillState {
  loading: boolean;
  listSkill: ISkill[];
  selectedSkill?: ISkill;
  currentSkill?: ISkill;

  openModalSkillInfomation: boolean;
  isSubmiting: boolean;
}

const initialState: SkillState = {
  loading: false,
  listSkill: [],
  selectedSkill: undefined,
  openModalSkillInfomation: false,
  isSubmiting: false,
};

export const SkillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    changeOpenModalSkillInfomation: (state, action) => {
      state.openModalSkillInfomation = action.payload;
    },
    changeSelectedSkill: (state, action) => {
      state.selectedSkill = action.payload;
    },
    changeIsSubmiting: (state, action) => {
      state.isSubmiting = action.payload;
    },
  },
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
    builder
      .addCase(skillThunks.updateSkill.pending, (state) => {
        state.isSubmiting = true;
      })
      .addCase(skillThunks.updateSkill.fulfilled, (state, action) => {
        state.isSubmiting = false;
        const index = state.listSkill.findIndex((skill) => skill.id === action.payload.data.id);
        if (index !== -1) {
          state.listSkill[index] = action.payload.data;
        }
        state.openModalSkillInfomation = false;
        toast.success("Update skill successfully");
      })
      .addCase(skillThunks.updateSkill.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmiting = false;
        toast.error(action.payload.errorMessage);
      });
    builder
      .addCase(skillThunks.getSkillById.pending, (state) => {
        state.loading = true;
      })
      .addCase(skillThunks.getSkillById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSkill = action.payload.data;
      })
      .addCase(skillThunks.getSkillById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload.errorMessage);
      });
  },
});

// Action creators are generated for each case reducer function
export const SkillActions = {
  ...SkillSlice.actions,
  ...skillThunks,
};

export default SkillSlice.reducer;
