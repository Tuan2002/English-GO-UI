export interface IAppResposeBase<T> {
  status: number;
  errorMessage?: string;
  data: T;
  error?: {
    message: string;
    details: string;
  };
  success: boolean;
}

export interface IErrorResponse {
  error: {
    message?: string;
    errorDetail?: string;
  };
  errorMessage: string;
}

export interface IGetDataResponse {
  limit?: number;
  page?: number;
  totalPage?: number;
  totalItem?: number;
}

export interface IFilterPayload {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IUploadImageResponse {
  public_id: string;
  url: string;
  secure_url: string;
  display_name: string;
  format: string;
}
