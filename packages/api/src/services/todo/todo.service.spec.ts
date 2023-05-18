import { jest, describe, expect, beforeEach } from "@jest/globals";

import { TodoEntityMockFactory } from "~/__mocks__/todo.entity.mock.ts";

import type { TodoFilterDto } from "./todo.filter.dto.ts";

jest.unstable_mockModule("~/infras/todo/todo.repository.ts", () => ({
  createTodoEntity: jest.fn(),
  updateTodoEntity: jest.fn(),
  deleteTodoEntityById: jest.fn(),
  recoverTodoEntityById: jest.fn(),
  getTodoEntityById: jest.fn(),
  countTodoEntityByFilter: jest.fn(),
  getTodoEntityListByFilter: jest.fn(),
}));

const TodoRepo = await import("~/infras/todo/todo.repository.ts");
const TodoService = await import("./todo.service.ts");

const TodoRepoMock = TodoRepo as jest.Mocked<typeof TodoRepo>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TodoService", () => {
  describe("#createTodoEntity", () => {
    it("should call TodoRepo.createTodoEntity", async () => {
      const val = { title: "title", description: "content" };

      TodoRepoMock.createTodoEntity.mockResolvedValueOnce({
        id: "id",
        title: val.title,
        description: val.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as never);

      const result = await TodoService.createTodoEntity(val);

      expect(TodoRepo.createTodoEntity).toBeCalledWith(val);
      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: val.title,
          description: val.description,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
    });
  });

  describe("#updateTodoEntity", () => {
    it("should call TodoRepo.updateTodoEntity", async () => {
      const val = TodoEntityMockFactory({ id: "id", title: "title", description: "content" });

      TodoRepoMock.updateTodoEntity.mockResolvedValueOnce();

      await TodoService.updateTodoEntity(val);

      expect(TodoRepo.updateTodoEntity).toBeCalledWith(val);
    });
  });

  describe("#deleteTodoEntityById", () => {
    it("should call TodoRepo.deleteTodoEntity", async () => {
      const id = "id";

      TodoRepoMock.deleteTodoEntityById.mockResolvedValueOnce();

      const result = await TodoService.deleteTodoEntityById(id);

      expect(TodoRepo.deleteTodoEntityById).toBeCalledWith(id);
      expect(result).toBeUndefined();
    });
  });

  describe("#recoverTodoEntityById", () => {
    it("should call TodoRepo.recoverTodoEntityById", async () => {
      const id = "id";

      TodoRepoMock.recoverTodoEntityById.mockResolvedValueOnce();

      const result = await TodoService.recoverTodoEntityById(id);

      expect(TodoRepo.recoverTodoEntityById).toBeCalledWith(id);
      expect(result).toBeUndefined();
    });
  });

  describe("#getTodoEntityById", () => {
    it("should call TodoRepo.getTodoEntityById", async () => {
      const id = "id";

      TodoRepoMock.getTodoEntityById.mockResolvedValueOnce(TodoEntityMockFactory({ id }));

      const result = await TodoService.getTodoEntityById(id);

      expect(TodoRepo.getTodoEntityById).toBeCalledWith(id);
      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
    });
  });

  describe("#countTodoEntityByFilter", () => {
    it("should call TodoRepo.countTodoEntityByFilter", async () => {
      const filter: TodoFilterDto = { page: 1, pageSize: 10, sortOrder: "asc" };

      TodoRepoMock.countTodoEntityByFilter.mockResolvedValueOnce(1);

      const result = await TodoService.countTodoEntityByFilter(filter);

      expect(TodoRepo.countTodoEntityByFilter).toBeCalledWith(filter);
      expect(result).toEqual(1);
    });
  });

  describe("#getTodoEntityListByFilter", () => {
    it("should call TodoRepo.getTodoEntityListByFilter", async () => {
      const filter: TodoFilterDto = { page: 1, pageSize: 10, sortOrder: "asc" };

      TodoRepoMock.getTodoEntityListByFilter.mockResolvedValueOnce([
        TodoEntityMockFactory({ id: "id1" }),
        TodoEntityMockFactory({ id: "id2" }),
      ]);

      const result = await TodoService.getTodoEntityListByFilter(filter);

      expect(TodoRepo.getTodoEntityListByFilter).toBeCalledWith(filter);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ])
      );
    });
  });
});
