import { createSlice } from "@reduxjs/toolkit";
import appThunks from "./appThunks";
import { IGroupRole } from "@/types/groupRole/GroupRoleType";

export interface AppState {
  loading: boolean;
  groupRoles: IGroupRole[];
}

const initialState: AppState = {
  loading: false,
  groupRoles: [],
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(appThunks.getAllGroupRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(appThunks.getAllGroupRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.groupRoles = action.payload.data || [];
      })
      .addCase(appThunks.getAllGroupRoles.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const AppAction = {
  ...AppSlice.actions,
  ...appThunks,
};

export default AppSlice.reducer;
