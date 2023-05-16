export const GetTodoById = {
  tags: ["Todo"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      $ref: "TodoDto#",
    },
  },
};

export const GetTodoList = {
  tags: ["Todo"],
  querystring: {
    $ref: "TodoFilterDto#",
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          items: {
            $ref: "TodoDto#",
          },
          pagination: {
            $ref: "PaginationDto#",
          },
        },
      },
    },
  },
};

export const GetDeletedTodoList = {
  tags: ["Todo"],
  response: {
    200: {
      type: "array",
      items: {
        $ref: "TodoDto#",
      },
    },
  },
};

export const CreateTodo = {
  tags: ["Todo"],
  body: {
    $ref: "TodoUpsertDto#",
  },
  response: {
    201: {
      $ref: "TodoDto#",
    },
  },
};

export const UpdateTodo = {
  tags: ["Todo"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  body: {
    $ref: "TodoUpsertDto#",
  },
  response: {
    204: {
      type: "null",
    },
  },
};

export const DeleteTodo = {
  tags: ["Todo"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    204: {
      type: "null",
    },
  },
};

export const RecoverTodo = {
  tags: ["Todo"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    204: {
      type: "null",
    },
  },
};
