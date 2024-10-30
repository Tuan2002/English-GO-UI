/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { IOrganization } from "@/types/organization/OrganizationType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllOrganizations = createAsyncThunk(
  "organization/getAllOrganizations",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<IOrganization[] | null>> => {
    try {
      const organizations: IAppResposeBase<IOrganization[]> = await http.get(`/api/organizations/get-organizations`);
      return organizations;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const createNewOrganization = createAsyncThunk(
  "organization/createNewOrganization",
  async (dataCreate: IOrganization, { rejectWithValue }): Promise<IAppResposeBase<IOrganization | null>> => {
    try {
      const organization: IAppResposeBase<IOrganization> = await http.post("/api/organizations/create-organization", dataCreate);
      return organization;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const updateOrganization = createAsyncThunk(
  "organization/updateOrganization",
  async (dataUpdate: IOrganization, { rejectWithValue }): Promise<IAppResposeBase<IOrganization | null>> => {
    try {
      const organization: IAppResposeBase<IOrganization> = await http.put(
        `/api/organizations/update-organization/${dataUpdate.id}`,
        dataUpdate
      );
      return organization;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);
const deleteOrganization = createAsyncThunk(
  "organization/deleteOrganization",
  async (id: string, { rejectWithValue }): Promise<IAppResposeBase<IOrganization | null>> => {
    try {
      const organization: IAppResposeBase<IOrganization> = await http.delete(`/api/organizations/delete-organization/${id}`);
      return organization;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const organizationThunks = {
  getAllOrganizations,
  createNewOrganization,
  updateOrganization,
  deleteOrganization,
};
export default organizationThunks;
