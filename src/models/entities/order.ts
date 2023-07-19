export interface Order {
  id: number;
  details: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}