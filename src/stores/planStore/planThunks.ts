/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import {
  ICreateNewPlanDTO,
  ICreatePlanAttribute,
  ICreatePlanType,
  IPlanAttribute,
  IPlanType,
  IUpdatePlanAttribute,
} from "@/types/plan/PlanTypes";
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
const getPlanTypeById = createAsyncThunk(
  "plans/getPlanTypeById",
  async (id: string, { rejectWithValue }): Promise<IAppResposeBase<IPlanType>> => {
    try {
      const response: IAppResposeBase<IPlanType> = await http.get(`/api/plans/get-plan-type/${id}`);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const getPlanAttributeOfPlanType = createAsyncThunk(
  "plans/getPlanAttributeOfPlanType",
  async (id: string, { rejectWithValue }): Promise<IAppResposeBase<IPlanAttribute[]>> => {
    try {
      const response: IAppResposeBase<IPlanAttribute[]> = await http.get(`/api/plans/get-plan-attribute-by-type/${id}`);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const createNewPlan = createAsyncThunk(
  "plans/createNewPlan",
  async (data: ICreateNewPlanDTO, { rejectWithValue }): Promise<IAppResposeBase<IPlanAttribute[]>> => {
    try {
      const newPlan: IAppResposeBase<IPlanAttribute[]> = await http.post("/api/plans/create-new-plan", data);
      return newPlan;
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
  getPlanTypeById,
  getPlanAttributeOfPlanType,
  createNewPlan,
};
export default planThunks;
