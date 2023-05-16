export const TodoDtoJsonSchema = {
  $id: "TodoDto",
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
  required: ["id", "title", "createdAt", "updatedAt"],
};
