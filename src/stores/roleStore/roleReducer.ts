import { createSlice } from "@reduxjs/toolkit";
import { IGroupRole } from "@/types/groupRole/GroupRoleType";
import roleThunks from "./roleThunks";

export interface AppState {
  loading: boolean;
  groupRoles: IGroupRole[];
}

const initialState: AppState = {
  loading: false,
  groupRoles: [],
};

export const RoleSlice = createSlice({
  name: "roleStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(roleThunks.getAllGroupRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(roleThunks.getAllGroupRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.groupRoles = action.payload.data || [];
      })
      .addCase(roleThunks.getAllGroupRoles.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const RoleActions = {
  ...RoleSlice.actions,
  ...roleThunks,
};

export default RoleSlice.reducer;
