export const TodoUpsertDtoJsonSchema = {
  $id: "TodoUpsertDto",
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
  required: ["title"],
};
