import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import scheduleThunks from "./scheduleThunks";
import { ActionModal } from "@/types/AppType";
import { ISchedule } from "@/types/schedule/ScheduleType";

export interface ScheduleState {
  schedules?: ISchedule[];
  selectedSchedule?: ISchedule;
  openModalSaveSchedule: boolean;
  isSubmitting: boolean;
  action: ActionModal;
  loading: boolean;
}

const initialState: ScheduleState = {
  schedules: [],
  selectedSchedule: undefined,
  action: "create",
  openModalSaveSchedule: false,
  loading: false,
  isSubmitting: false,
};

export const ScheduleSlice = createSlice({
  name: "ScheduleSlice",
  initialState,
  reducers: {
    changeOpenModalSaveSchedule: (state, action) => {
      state.openModalSaveSchedule = action.payload;
    },
    changeActionModal: (state, action) => {
      state.action = action.payload;
    },
    changeSelectedSchedule: (state, action) => {
      state.selectedSchedule = action.payload;
    },
    initSelectedSchedule: (state) => {
      state.selectedSchedule = {
        id: "",
        examPeriod: "",
        organizationId: "",
        startDate: "",
        endDate: "",
        note: "",
        description: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleThunks.getAllSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(scheduleThunks.getAllSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload.data as ISchedule[];
      })
      .addCase(scheduleThunks.getAllSchedules.rejected, (state, action) => {
        state.loading = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
    builder
      .addCase(scheduleThunks.createNewSchedule.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(scheduleThunks.createNewSchedule.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveSchedule = false;
        state.schedules?.unshift(action.payload.data as ISchedule);
        toast.success("Thêm mới đơn vị tổ chức thi thành công");
      })
      .addCase(scheduleThunks.createNewSchedule.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
    builder
      .addCase(scheduleThunks.updateSchedule.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(scheduleThunks.updateSchedule.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveSchedule = false;
        state.schedules = state.schedules?.map((item) => (item.id === action.payload.data?.id ? action.payload.data : item));
        toast.success("Cập nhật thông tin đơn vị tổ chức thi thành công");
      })
      .addCase(scheduleThunks.updateSchedule.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
    builder
      .addCase(scheduleThunks.deleteSchedule.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(scheduleThunks.deleteSchedule.fulfilled, (state, action) => {
        state.isSubmitting = false;
        console.log(action.payload.data);
        state.schedules = state.schedules?.filter((item) => item.id !== action.payload.data?.id);
        toast.success("Xóa đơn vị tổ chức thi thành công");
      })
      .addCase(scheduleThunks.deleteSchedule.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
  },
});

// Action creators are generated for each case reducer function
export const ScheduleActions = {
  ...ScheduleSlice.actions,
  ...scheduleThunks,
};

export default ScheduleSlice.reducer;
