/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppResposeBase } from "@/types/AppType";
import { ICategory, ICategoryRequestData } from "@/types/category/CategoryTypes";
import http from "@/utils/axios/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllCategoryOfLevel = createAsyncThunk(
  "categories/getAllCategories",
  async (levelId: string, { rejectWithValue }): Promise<IAppResposeBase<ICategory[] | null>> => {
    try {
      const categories: IAppResposeBase<ICategory[]> = await http.get(`/api/categories/get-category-of-level/${levelId}`);
      return categories;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const createNewCategory = createAsyncThunk(
  "categories/createNewCategory",
  async (dataCreate: ICategoryRequestData, { rejectWithValue }): Promise<IAppResposeBase<ICategory | null>> => {
    try {
      const category: IAppResposeBase<ICategory> = await http.post("/api/categories/create-category", dataCreate);
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (dataUpdate: ICategoryRequestData, { rejectWithValue }): Promise<IAppResposeBase<ICategory | null>> => {
    try {
      const category: IAppResposeBase<ICategory> = await http.put(`/api/categories/update-category/${dataUpdate.id}`, dataUpdate);
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string, { rejectWithValue }): Promise<IAppResposeBase<ICategory | null>> => {
    try {
      const category: IAppResposeBase<ICategory> = await http.delete(`/api/categories/delete-category/${categoryId}`);
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const restoreCategory = createAsyncThunk(
  "categories/restoreCategory",
  async (categoryId: string, { rejectWithValue }): Promise<IAppResposeBase<ICategory | null>> => {
    try {
      const category: IAppResposeBase<ICategory> = await http.put(`/api/categories/restore-category/${categoryId}`);
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const activeCategory = createAsyncThunk(
  "categories/activeCategory",
  async (categoryId: string, { rejectWithValue }): Promise<IAppResposeBase<ICategory | null>> => {
    try {
      const category: IAppResposeBase<ICategory> = await http.put(`/api/categories/active-category/${categoryId}`);
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const inactiveCategory = createAsyncThunk(
  "categories/inactiveCategory",
  async (categoryId: string, { rejectWithValue }): Promise<IAppResposeBase<ICategory | null>> => {
    try {
      const category: IAppResposeBase<ICategory> = await http.put(`/api/categories/inactive-category/${categoryId}`);
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const deleteCategoryPermanently = createAsyncThunk(
  "categories/deleteCategoryPermanently",
  async (categoryId: string, { rejectWithValue }): Promise<IAppResposeBase<ICategory | null>> => {
    try {
      const category: IAppResposeBase<ICategory> = await http.delete(`/api/categories/delete-category-permanently/${categoryId}`);
      return category;
    } catch (error: any) {
      return rejectWithValue(error.response.data) as any;
    }
  }
);

const categoryThunks = {
  getAllCategoryOfLevel,
  createNewCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
  activeCategory,
  inactiveCategory,
  deleteCategoryPermanently,
};

export default categoryThunks;
