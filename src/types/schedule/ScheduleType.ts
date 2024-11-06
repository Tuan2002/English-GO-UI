export interface ISchedule {
  id: string;
  examPeriod: string;
  organizationId: string;
  startDate: string;
  endDate: string;
  note?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
