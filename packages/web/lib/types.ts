import type { DateTime } from "luxon";

export type TodoDto = {
  id: string;
  title: string;
  description?: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type PaginationDto = {
  page: number;
  pageSize: number;
  count: number;
  totalPages: number;
};
