/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { ICreatePlanAttribute, ICreatePlanType, IPlanAttribute, IPlanType, IUpdatePlanAttribute } from "@/types/plan/PlanTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllPlanTypes = createAsyncThunk(
  "plans/getAllPlanTypes",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IPlanType[]>> => {
    try {
      const plans: IAppResposeBase<IPlanType[]> = await http.get("/api/plans/get-plan-types");
      return plans;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const createNewPlanAttributes = createAsyncThunk(
  "plans/createNewPlanAttributes",
  async (data: ICreatePlanAttribute, { rejectWithValue }): Promise<IAppResposeBase<IPlanAttribute[]>> => {
    try {
      const newAttribute: IAppResposeBase<IPlanAttribute[]> = await http.post("/api/plans/create-plan-attributes", data);
      return newAttribute;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const updatePlanAttribute = createAsyncThunk(
  "plans/updatePlanAttribute",
  async (data: IUpdatePlanAttribute, { rejectWithValue }): Promise<IAppResposeBase<IPlanAttribute>> => {
    try {
      const newAttribute: IAppResposeBase<IPlanAttribute> = await http.put("/api/plans/update-plan-attribute", data);
      return newAttribute;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const createNewPlanType = createAsyncThunk(
  "plans/createNewPlanType",
  async (data: ICreatePlanType, { rejectWithValue }): Promise<IAppResposeBase<IPlanType>> => {
    try {
      const newAttribute: IAppResposeBase<IPlanType> = await http.post("/api/plans/create-plan-type", data);
      return newAttribute;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getGeneralPlanAttributes = createAsyncThunk(
  "plans/getGeneralPlanAttributes",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IPlanAttribute[]>> => {
    try {
      const plans: IAppResposeBase<IPlanAttribute[]> = await http.get("/api/plans/get-general-attributes");
      return plans;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const deletePlanAttribute = createAsyncThunk(
  "plans/deletePlanAttribute",
  async (id: string, { rejectWithValue }): Promise<IAppResposeBase<IPlanAttribute>> => {
    try {
      const plans: IAppResposeBase<IPlanAttribute> = await http.delete(`/api/plans/delete-plan-attribute/${id}`);
      return plans;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const planThunks = {
  getAllPlanTypes,
  createNewPlanAttributes,
  updatePlanAttribute,
  createNewPlanType,
  getGeneralPlanAttributes,
  deletePlanAttribute,
};
export default planThunks;
