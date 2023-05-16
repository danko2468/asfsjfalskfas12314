export type TodoDto = {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PaginationDto = {
  page: number;
  pageSize: number;
  count: number;
  totalPages: number;
};
