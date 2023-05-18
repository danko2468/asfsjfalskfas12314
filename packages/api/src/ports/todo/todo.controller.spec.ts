import { jest, describe, expect, beforeEach } from "@jest/globals";

import { FastifyReplyMockFactory } from "~/__mocks__/fastify.reply.mock.ts";
import { TodoEntityMockFactory } from "~/__mocks__/todo.entity.mock.ts";

import type { FastifyRequest } from "fastify";

jest.unstable_mockModule("~/services/todo/todo.service.ts", () => ({
  createTodoEntity: jest.fn(),
  updateTodoEntity: jest.fn(),
  deleteTodoEntityById: jest.fn(),
  recoverTodoEntityById: jest.fn(),
  getTodoEntityById: jest.fn(),
  countTodoEntityByFilter: jest.fn(),
  getTodoEntityListByFilter: jest.fn(),
}));

const TodoService = await import("~/services/todo/todo.service.ts");
const TodoController = await import("./todo.controller.ts");

const TodoServiceMock = TodoService as jest.Mocked<typeof TodoService>;

const expectTodoDto = (val: any) => {
  expect(val).toMatchObject({
    id: expect.any(String),
    title: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });
  expect((typeof val.description).match(/^(undefined|string)$/)).toBeTruthy();
  expect((typeof val.deletedAt).match(/^(undefined|string)$/)).toBeTruthy();
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TodoController", () => {
  describe("#getTodoById", () => {
    it("should return a todo", async () => {
      const id = "id";
      const todo = TodoEntityMockFactory({ id });
      TodoServiceMock.getTodoEntityById.mockResolvedValueOnce(todo);
      const req = { params: { id: todo.id } } as unknown as FastifyRequest;
      const res = await TodoController.getTodoById(req);

      expect(TodoServiceMock.getTodoEntityById).toBeCalledWith(todo.id);
      expectTodoDto(res);
    });
  });

  describe("#getTodoList", () => {
    it("should return a list of todos", async () => {
      const todo = TodoEntityMockFactory({ id: "id" });
      const todos = [todo];
      TodoServiceMock.getTodoEntityListByFilter.mockResolvedValueOnce(todos);
      TodoServiceMock.countTodoEntityByFilter.mockResolvedValueOnce(todos.length);

      const req = { query: {} } as unknown as FastifyRequest;
      const res = await TodoController.getTodoList(req);

      const filter = {
        keywords: undefined,
        page: 0,
        pageSize: 24,
        sortOrder: "asc",
        archived: undefined,
      };

      expect(TodoServiceMock.getTodoEntityListByFilter).toBeCalledWith(filter);
      expect(TodoServiceMock.countTodoEntityByFilter).toBeCalledWith(filter);
      expect(res).toMatchObject({
        items: expect.any(Array),
        pagination: expect.any(Object),
      });
      expect(res.items).toHaveLength(1);
      res.items.forEach(expectTodoDto);
    });
  });

  describe("#createTodo", () => {
    it("should create a todo", async () => {
      const payload = { title: "title", description: "description" };
      const todo = TodoEntityMockFactory({ id: "id", ...payload });
      TodoServiceMock.createTodoEntity.mockResolvedValueOnce(todo);

      const reply = FastifyReplyMockFactory();
      const req = { body: payload } as unknown as FastifyRequest;
      const result = await TodoController.createTodo(req, reply as never);

      expect(TodoServiceMock.createTodoEntity).toBeCalledWith(req.body);
      expect(reply.status).toBeCalledWith(201);
      expect(reply.send).toBeCalledWith(todo);
      expect(result).toBe(reply);
    });
  });

  describe("#updateTodo", () => {
    it("should update a todo", async () => {
      const id = "id";
      const payload = { title: "title", description: "description" };
      TodoServiceMock.updateTodoEntity.mockResolvedValueOnce(undefined);

      const reply = FastifyReplyMockFactory();
      const req = { params: { id }, body: payload } as unknown as FastifyRequest;
      const result = await TodoController.updateTodo(req, reply as never);

      expect(TodoServiceMock.updateTodoEntity).toBeCalledWith({ id, ...payload });
      expect(reply.send).toBeCalledWith(null);
      expect(reply.status).toBeCalledWith(204);
      expect(result).toBe(reply);
    });
  });

  describe("#deleteTodo", () => {
    it("should delete a todo", async () => {
      const id = "id";
      TodoServiceMock.deleteTodoEntityById.mockResolvedValueOnce(undefined);

      const reply = FastifyReplyMockFactory();
      const req = { params: { id } } as unknown as FastifyRequest;
      const result = await TodoController.deleteTodo(req, reply as never);

      expect(TodoServiceMock.deleteTodoEntityById).toBeCalledWith(id);
      expect(reply.send).toBeCalledWith(null);
      expect(reply.status).toBeCalledWith(204);
      expect(result).toBe(reply);
    });
  });

  describe("#recoverTodo", () => {
    it("should recover a todo", async () => {
      const id = "id";
      TodoServiceMock.recoverTodoEntityById.mockResolvedValueOnce(undefined);

      const reply = FastifyReplyMockFactory();
      const req = { params: { id } } as unknown as FastifyRequest;
      const result = await TodoController.recoverTodo(req, reply as never);

      expect(TodoServiceMock.recoverTodoEntityById).toBeCalledWith(id);
      expect(reply.send).toBeCalledWith(null);
      expect(reply.status).toBeCalledWith(204);
      expect(result).toBe(reply);
    });
  });
});
