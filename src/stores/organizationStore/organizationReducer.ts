import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import organizationThunks from "./organizationThunks";
import { IOrganization } from "@/types/organization/OrganizationType";
import { ActionModal } from "@/types/AppType";

export interface OrganizationState {
  organizations?: IOrganization[];
  selectedOrganization?: IOrganization;
  openModalSaveOrganization: boolean;
  isSubmitting: boolean;
  action: ActionModal;
  loading: boolean;
}

const initialState: OrganizationState = {
  organizations: [],
  selectedOrganization: undefined,
  action: "create",
  openModalSaveOrganization: false,
  loading: false,
  isSubmitting: false,
};

export const OrganizationSlice = createSlice({
  name: "OrganizationSlice",
  initialState,
  reducers: {
    changeOpenModalSaveOrganization: (state, action) => {
      state.openModalSaveOrganization = action.payload;
    },
    changeActionModal: (state, action) => {
      state.action = action.payload;
    },
    changeSelectedOrganization: (state, action) => {
      state.selectedOrganization = action.payload;
    },
    initSelectedOrganization: (state) => {
      state.selectedOrganization = {
        id: "",
        name: "",
        description: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(organizationThunks.getAllOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(organizationThunks.getAllOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload.data as IOrganization[];
      })
      .addCase(organizationThunks.getAllOrganizations.rejected, (state, action) => {
        state.loading = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
    builder
      .addCase(organizationThunks.createNewOrganization.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(organizationThunks.createNewOrganization.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveOrganization = false;
        state.organizations?.unshift(action.payload.data as IOrganization);
        toast.success("Thêm mới đơn vị tổ chức thi thành công");
      })
      .addCase(organizationThunks.createNewOrganization.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
    builder
      .addCase(organizationThunks.updateOrganization.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(organizationThunks.updateOrganization.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.openModalSaveOrganization = false;
        state.organizations = state.organizations?.map((item) =>
          item.id === action.payload.data?.id ? action.payload.data : item
        );
        toast.success("Cập nhật thông tin đơn vị tổ chức thi thành công");
      })
      .addCase(organizationThunks.updateOrganization.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
    builder
      .addCase(organizationThunks.deleteOrganization.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(organizationThunks.deleteOrganization.fulfilled, (state, action) => {
        state.isSubmitting = false;
        console.log(action.payload.data);
        state.organizations = state.organizations?.filter((item) => item.id !== action.payload.data?.id);
        toast.success("Xóa đơn vị tổ chức thi thành công");
      })
      .addCase(organizationThunks.deleteOrganization.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
  },
});

// Action creators are generated for each case reducer function
export const OrganizationActions = {
  ...OrganizationSlice.actions,
  ...organizationThunks,
};

export default OrganizationSlice.reducer;
