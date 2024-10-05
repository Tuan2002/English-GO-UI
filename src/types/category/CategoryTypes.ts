export interface ICategory {
  id: string;
  name: string;
  image?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isActive: boolean;
  skillId: string;
  levelId: string;
}
export interface ICategoryRequestData {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  skillId: string;
  levelId: string;
}
