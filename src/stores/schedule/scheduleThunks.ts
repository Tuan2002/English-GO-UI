/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { ISchedule } from "@/types/schedule/ScheduleType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllSchedules = createAsyncThunk(
  "schedule/getAllSchedules",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<ISchedule[] | null>> => {
    try {
      const schedules: IAppResposeBase<ISchedule[]> = await http.get(`/api/schedules/get-schedules`);
      return schedules;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const createNewSchedule = createAsyncThunk(
  "schedule/createNewSchedule",
  async (dataCreate: ISchedule, { rejectWithValue }): Promise<IAppResposeBase<ISchedule | null>> => {
    try {
      const schedule: IAppResposeBase<ISchedule> = await http.post("/api/schedules/create-schedule", dataCreate);
      return schedule;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async (dataUpdate: ISchedule, { rejectWithValue }): Promise<IAppResposeBase<ISchedule | null>> => {
    try {
      const schedule: IAppResposeBase<ISchedule> = await http.put(`/api/schedules/update-schedule/${dataUpdate.id}`, dataUpdate);
      return schedule;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (id: string, { rejectWithValue }): Promise<IAppResposeBase<ISchedule | null>> => {
    try {
      const schedule: IAppResposeBase<ISchedule> = await http.delete(`/api/schedules/delete-schedule/${id}`);
      return schedule;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const scheduleThunks = {
  getAllSchedules,
  createNewSchedule,
  updateSchedule,
  deleteSchedule,
};
export default scheduleThunks;
