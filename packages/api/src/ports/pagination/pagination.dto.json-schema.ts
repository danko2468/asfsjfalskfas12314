export const PaginationDtoJsonSchmea = {
  $id: "PaginationDto",
  type: "object",
  properties: {
    page: { type: "number" },
    pageSize: { type: "number" },
    count: { type: "number" },
    totalPages: { type: "number" },
  },
  required: ["page", "pageSize", "count", "totalPages"],
};
