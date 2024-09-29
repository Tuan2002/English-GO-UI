import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userThunks from "./userThunks";
import { IUserData } from "@/types/user/UserType";
import { toast } from "react-toastify";

export interface AuthState {
  user?: IUserData;
  selectedUser?: IUserData;
  listUser?: IUserData[];

  openModalCreateUser: boolean;
  openModalUpdateUser: boolean;

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

  openModalCreateUser: false,
  openModalUpdateUser: false,

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
    openModalCreateUser: (state) => {
      state.openModalCreateUser = true;
    },
    closeModalCreateUser: (state) => {
      state.openModalCreateUser = false;
    },
    openModalUpdateUser: (state) => {
      state.openModalUpdateUser = true;
    },
    closeModalUpdateUser: (state) => {
      state.openModalUpdateUser = false;
    },
    changeSelectedUser: (state, action: PayloadAction<IUserData | undefined>) => {
      state.selectedUser = action.payload;
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
    changeSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
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
      .addCase(userThunks.getAllUsers.rejected, (state, action) => {
        state.loading = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
    builder
      .addCase(userThunks.createNewUser.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(userThunks.createNewUser.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listUser?.unshift(action.payload.data);
        state.openModalCreateUser = false;
        toast.success("Tạo mới người dùng thành công");
      })
      .addCase(userThunks.createNewUser.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
    builder
      .addCase(userThunks.updateUser.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(userThunks.updateUser.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.listUser = state.listUser?.map((user) => (user.id === action.payload.data.id ? action.payload.data : user));
        state.openModalUpdateUser = false;
        toast.success("Cập nhật người dùng thành công");
      })
      .addCase(userThunks.updateUser.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
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
      .addCase(userThunks.deleteUser.rejected, (state, action) => {
        state.isDeleting = false;
        toast.error((action.payload as { errorMessage: string }).errorMessage);
      });
  },
});

// Action creators are generated for each case reducer function
export const UserActions = {
  ...UserSlice.actions,
  ...userThunks,
};

export default UserSlice.reducer;
