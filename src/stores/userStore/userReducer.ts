import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userThunks from "./userThunks";
import { IUserData } from "@/types/user/UserType";
import { toast } from "react-toastify";

export interface AuthState {
  user?: IUserData;
  listUser?: IUserData[];

  openModalSaveUser: boolean;

  page?: number;
  limit?: number;
  search?: string;
  totalPage?: number;
  totalUser?: number;

  loading: boolean;
  isSubmitting?: boolean;
  isDeleting?: boolean;
  error?: string;
}

const initialState: AuthState = {
  user: undefined,
  listUser: [],

  openModalSaveUser: false,

  page: 1,
  limit: 10,
  search: "",
  totalPage: 0,
  totalUser: 0,

  loading: false,
  isSubmitting: false,
  error: undefined,
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    openModalSaveUser: (state) => {
      state.openModalSaveUser = true;
    },
    closeModalSaveUser: (state) => {
      state.openModalSaveUser = false;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userThunks.getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.listUser = action.payload.data.users;
        state.totalUser = action.payload.data.totalItem;
        state.totalPage = action.payload.data.totalPage;
      })
      .addCase(userThunks.getAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload.errorMessage);
      });
    builder
      .addCase(userThunks.createNewUser.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(userThunks.createNewUser.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listUser?.unshift(action.payload.data);
        state.openModalSaveUser = false;
        toast.success("Tạo mới người dùng thành công");
      })
      .addCase(userThunks.createNewUser.rejected, (state, action: PayloadAction<any>) => {
        state.isSubmitting = false;
        toast.error(action.payload.errorMessage);
      });
    builder
      .addCase(userThunks.deleteUser.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(userThunks.deleteUser.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.listUser = state.listUser?.filter((user) => user.id !== action.meta.arg);
        toast.success("Xóa người dùng thành công");
      })
      .addCase(userThunks.deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.isDeleting = false;
        toast.error(action.payload.errorMessage);
      });
  },
});

// Action creators are generated for each case reducer function
export const UserActions = {
  ...UserSlice.actions,
  ...userThunks,
};

export default UserSlice.reducer;
