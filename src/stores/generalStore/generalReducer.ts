import { createSlice } from "@reduxjs/toolkit";
import { generalThunks } from "./generalThunks";
import { IProvince } from "@/types/province/ProvinceType";
import { IMemberCount } from "@/types/memberCount/MemberCountType";

export interface GeneralState {
  loading: boolean;
  provinces: IProvince[];
  memberCounts: IMemberCount[];
}

const initialState: GeneralState = {
  loading: false,
  provinces: [],
  memberCounts: [],
};

export const GeneralSlice = createSlice({
  name: "General",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generalThunks.getProvinces.pending, (state) => {
        state.loading = true;
      })
      .addCase(generalThunks.getProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload.data || [];
      })
      .addCase(generalThunks.getProvinces.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(generalThunks.getMemberCounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(generalThunks.getMemberCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.memberCounts = action.payload.data || [];
      })
      .addCase(generalThunks.getMemberCounts.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const GeneralAction = {
  ...GeneralSlice.actions,
  ...generalThunks,
};

export default GeneralSlice.reducer;
