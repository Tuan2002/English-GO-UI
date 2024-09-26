import { IAppResposeBase, IFilterPayload } from "@/types/AppType";
import { ICompany, IGetListCompanyResponse, IRegisterCompany } from "@/types/company/CompanyType";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const registerCompanyByRecruiter = createAsyncThunk(
  "company/registerCompanyByRecruiter",
  async (payload: IRegisterCompany, { rejectWithValue, dispatch }): Promise<IAppResposeBase<ICompany>> => {
    try {
      const response: IAppResposeBase<ICompany> = await http.post("/api/companies/register-company-by-recruiter", payload);
      dispatch<any>(getMyCompany());
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getMyCompany = createAsyncThunk(
  "company/getMyCompany",
  async (_, { rejectWithValue }): Promise<IAppResposeBase<ICompany>> => {
    try {
      const response: IAppResposeBase<ICompany> = await http.get("/api/companies/my-company");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const updateCompanyWhenRegister = createAsyncThunk(
  "company/updateCompanyWhenRegister",
  async (payload: IRegisterCompany, { rejectWithValue, dispatch }): Promise<IAppResposeBase<ICompany>> => {
    try {
      const response: IAppResposeBase<ICompany> = await http.put("/api/companies/update-company-when-register", payload);
      dispatch<any>(getMyCompany());
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getAllCompanyByManager = createAsyncThunk(
  "company/getAllCompanyByManager",
  async (payload: IFilterPayload, { rejectWithValue }): Promise<IAppResposeBase<IGetListCompanyResponse>> => {
    try {
      const { page = 1, limit = 2, search = "" } = payload;
      const response: IAppResposeBase<IGetListCompanyResponse> = await http.get(
        `/api/companies/list-company?page=${page}&limit=${limit}&search=${search}`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const getCompanyById = createAsyncThunk("company/getCompanyById", async (id: string, { rejectWithValue }) => {
  try {
    const response: IAppResposeBase<ICompany> = await http.get(`/api/companies/company/${id}`);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as any;
  }
});

const approveRegisterCompany = createAsyncThunk("company/approveRegisterCompany", async (id: string, { rejectWithValue }) => {
  try {
    const response: IAppResposeBase<ICompany> = await http.put(`/api/companies/approve-register-company/${id}`);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as any;
  }
});

const rejectRegisterCompany = createAsyncThunk(
  "company/rejectRegisterCompany",
  async ({ id, reason }: { id: string; reason: string }, { rejectWithValue }) => {
    try {
      const response: IAppResposeBase<ICompany> = await http.put(`/api/companies/reject-register-company/${id}`, {
        reason,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

export const companyThunks = {
  registerCompanyByRecruiter,
  getMyCompany,
  updateCompanyWhenRegister,
  getAllCompanyByManager,
  getCompanyById,
  approveRegisterCompany,
  rejectRegisterCompany,
};
