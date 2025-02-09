/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILevel } from "@/types/level/LevelTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import levelThunks from "./levelThunks";

export interface LevelState {
  loading: boolean;
  listLevelOfSkill: ILevel[];
  listLevel?: ILevel[];
  currentLevel?: ILevel;
  selectedLevel?: ILevel;

  openModalLevelInfomation: boolean;
  isSubmiting: boolean;
}

const initialState: LevelState = {
  loading: false,
  listLevelOfSkill: [],
  selectedLevel: undefined,
  openModalLevelInfomation: false,
  isSubmiting: false,
};

export const LevelSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    changeOpenModalLevelInfomation: (state, action) => {
      state.openModalLevelInfomation = action.payload;
    },
    changeSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },
    changeIsSubmiting: (state, action) => {
      state.isSubmiting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(levelThunks.getAllLevels.pending, (state) => {
        state.loading = true;
      })
      .addCase(levelThunks.getAllLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.listLevel = action.payload.data;
      })
      .addCase(levelThunks.getAllLevels.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(levelThunks.getLevelOfSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(levelThunks.getLevelOfSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.listLevelOfSkill = action.payload.data;
      })
      .addCase(levelThunks.getLevelOfSkill.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(levelThunks.updateLevel.pending, (state) => {
        state.isSubmiting = true;
      })
      .addCase(levelThunks.updateLevel.fulfilled, (state, action) => {
        state.isSubmiting = false;
        const index = state.listLevelOfSkill.findIndex((level) => level.id === action.payload.data.id);
        if (index !== -1) {
          state.listLevelOfSkill[index] = action.payload.data;
        }
        state.openModalLevelInfomation = false;
        toast.success("Update skill successfully");
      })
      .addCase(levelThunks.updateLevel.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmiting = false;
        toast.error(action.payload.errorMessage);
      });
    builder
      .addCase(levelThunks.getLevelById.pending, (state) => {
        state.loading = true;
      })
      .addCase(levelThunks.getLevelById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLevel = action.payload.data;
      })
      .addCase(levelThunks.getLevelById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload.errorMessage);
      });
  },
});

// Action creators are generated for each case reducer function
export const LevelActions = {
  ...LevelSlice.actions,
  ...levelThunks,
};

export default LevelSlice.reducer;
