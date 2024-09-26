import { StatusChipType } from "@/components/StatusChip";

export enum ECompanyStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

export const CompanyStatus = [
  {
    label: "Chờ duyệt",
    status: StatusChipType.PENDING,
  },
  {
    label: "Đã duyệt",
    status: StatusChipType.APPROVED,
  },
  {
    label: "Từ chối",
    status: StatusChipType.REJECTED,
  },
];
