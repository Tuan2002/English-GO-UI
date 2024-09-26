import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { companyThunks } from "./companyThunks";
import { toast } from "react-toastify";
import { ICompany } from "@/types/company/CompanyType";

export interface CompanyState {
  loading: boolean;
  myCompany?: ICompany;
  listCompany?: ICompany[];
  currentCompany?: ICompany;
  selectedCompanyId?: string;

  openModalShowCompany: boolean;
  openModalApproveRegisterCompany: boolean;
  openModalRejectRegisterCompany: boolean;
  openModalUpdateCompany: boolean;

  page?: number;
  limit?: number;
  search?: string;
  totalPage?: number;
  totalCompany?: number;

  isSubmitting?: boolean;
}

const initialState: CompanyState = {
  loading: false,
  myCompany: undefined,
  listCompany: [],
  currentCompany: undefined,
  selectedCompanyId: undefined,
  openModalShowCompany: false,
  openModalApproveRegisterCompany: false,
  openModalRejectRegisterCompany: false,
  openModalUpdateCompany: false,
  page: 1,
  limit: 10,
  search: "",
  totalPage: 0,
  totalCompany: 0,
  isSubmitting: false,
};

export const CompanySlice = createSlice({
  name: "Company",
  initialState,
  reducers: {
    setSelectedCompanyId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedCompanyId = action.payload;
    },
    setOpenModalShowCompany: (state, action: PayloadAction<boolean>) => {
      state.openModalShowCompany = action.payload;
    },
    setCurrentCompany: (state, action: PayloadAction<ICompany | undefined>) => {
      state.currentCompany = action.payload;
    },
    setOpenModalApproveRegisterCompany: (state, action: PayloadAction<boolean>) => {
      state.openModalApproveRegisterCompany = action.payload;
    },
    setOpenModalRejectRegisterCompany: (state, action: PayloadAction<boolean>) => {
      state.openModalRejectRegisterCompany = action.payload;
    },
    setOpenModalUpdateCompany: (state, action: PayloadAction<boolean>) => {
      state.openModalUpdateCompany = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(companyThunks.registerCompanyByRecruiter.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(companyThunks.registerCompanyByRecruiter.fulfilled, (state, action) => {
        toast.success("Yêu cầu đăng kí công ty thành công, vui lòng chờ được duyệt");
        state.isSubmitting = false;
      })
      .addCase(companyThunks.registerCompanyByRecruiter.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.errorMessage);
      });

    builder
      .addCase(companyThunks.getMyCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(companyThunks.getMyCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.myCompany = action.payload.data;
      })
      .addCase(companyThunks.getMyCompany.rejected, (state) => {
        state.loading = false;
        state.myCompany = undefined;
      });

    builder
      .addCase(companyThunks.updateCompanyWhenRegister.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(companyThunks.updateCompanyWhenRegister.fulfilled, (state, action) => {
        state.myCompany = action.payload.data;
        state.isSubmitting = false;
        toast.success("Cập nhật thông tin công ty thành công");
      })
      .addCase(companyThunks.updateCompanyWhenRegister.rejected, (state, action: PayloadAction<any>) => {
        toast.error(action.payload.errorMessage);
        state.isSubmitting = false;
      });

    builder
      .addCase(companyThunks.getAllCompanyByManager.pending, (state) => {
        state.loading = true;
      })
      .addCase(companyThunks.getAllCompanyByManager.fulfilled, (state, action) => {
        state.loading = false;
        state.listCompany = action.payload.data.companies;
        state.totalCompany = action.payload.data.totalItem;
        state.totalPage = action.payload.data.totalPage;
      })
      .addCase(companyThunks.getAllCompanyByManager.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload.errorMessage);
      });

    builder
      .addCase(companyThunks.getCompanyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(companyThunks.getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCompany = action.payload.data;
      })
      .addCase(companyThunks.getCompanyById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload.errorMessage);
      });

    builder
      .addCase(companyThunks.approveRegisterCompany.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(companyThunks.approveRegisterCompany.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listCompany = state.listCompany?.map((item) => {
          return item.id === action.payload.data.id ? action.payload.data : item;
        });
        CompanySlice.caseReducers.setOpenModalApproveRegisterCompany(state, {
          payload: false,
          type: "Company/setOpenModalApproveRegisterCompany",
        });
        CompanySlice.caseReducers.setCurrentCompany(state, {
          payload: action.payload.data,
          type: "Company/setCurrentCompany",
        });
        toast.success("Đã duyệt đăng kí thành công!");
      })
      .addCase(companyThunks.approveRegisterCompany.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.errorMessage);
      });

    builder
      .addCase(companyThunks.rejectRegisterCompany.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(companyThunks.rejectRegisterCompany.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listCompany = state.listCompany?.map((item) => {
          return item.id === action.payload.data.id ? action.payload.data : item;
        });
        CompanySlice.caseReducers.setOpenModalRejectRegisterCompany(state, {
          payload: false,
          type: "Company/setOpenModalRejectRegisterCompany",
        });
        CompanySlice.caseReducers.setCurrentCompany(state, {
          payload: action.payload.data,
          type: "Company/setCurrentCompany",
        });
        toast.success("Đã từ chối đăng kí thành công!");
      })
      .addCase(companyThunks.rejectRegisterCompany.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.errorMessage);
      });
  },
});

// Action creators are generated for each case reducer function
export const CompanyActions = {
  ...CompanySlice.actions,
  ...companyThunks,
};

export default CompanySlice.reducer;
