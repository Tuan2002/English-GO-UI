import { createSlice } from "@reduxjs/toolkit";
import { IGroupRole } from "@/types/groupRole/GroupRoleType";
import questionThunks from "./roleThunks";

export interface AppState {
  loading: boolean;
  groupRoles: IGroupRole[];

  openModalSaveQuestion: boolean;
}

const initialState: AppState = {
  loading: false,
  groupRoles: [],
  openModalSaveQuestion: false,
};

export const QuestionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    changeOpenModalSaveQuestion: (state, action) => {
      state.openModalSaveQuestion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(questionThunks.getAllQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(questionThunks.getAllQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.groupRoles = action.payload.data || [];
      })
      .addCase(questionThunks.getAllQuestions.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const QuestionActions = {
  ...QuestionSlice.actions,
  ...questionThunks,
};

export default QuestionSlice.reducer;
