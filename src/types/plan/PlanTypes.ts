export interface IPlanType {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface IPlanAttribute {
  id: string;
  name: string;
  displayName: string;
  dataType: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  isDefault: boolean;
  planTypeId?: string;
}

export interface ICreatePlanAttribute {
  planAttributes: IPlanAttribute[];
}
export interface ICreatePlanType {
  name: string;
  displayName: string;
  description?: string;
  planAttributes: IPlanAttribute[];
}
export interface IUpdatePlanType {
  name: string;
  displayName: string;
  description?: string;
}
export interface IUpdatePlanAttribute {
  id: string;
  name: string;
  displayName: string;
  note?: string;
  dataType: string;
}
