export const TodoFilterDtoJsonSchema = {
  $id: "TodoFilterDto",
  type: "object",
  properties: {
    page: { type: "number" },
    pageSize: { type: "number" },
    keywords: { type: "string" },
    sortOrder: { type: "string", enum: ["asc", "desc"] },
    archived: { type: "boolean" },
  },
};
