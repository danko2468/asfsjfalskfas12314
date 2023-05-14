export const TodoDtoJsonSchema = {
  $id: "TodoDto",
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "title", "createdAt", "updatedAt"],
};
