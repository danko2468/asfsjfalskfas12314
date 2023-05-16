import type { PaginationDto } from "./pagination.dto.ts";

export function getPaginationDto(page: number, pageSize: number, count: number): PaginationDto {
  return {
    page,
    pageSize,
    count,
    totalPages: Math.ceil(count / pageSize),
  };
}
