import { describe, it, expect } from "@jest/globals";

import { getPaginationDto } from "./pagination.dto.converters.ts";

describe("PaginationDtoConverters", () => {
  describe("#getPaginationDto", () => {
    it("should return a pagination dto", () => {
      const page = 0;
      const pageSize = 24;
      const count = 100;
      const res = getPaginationDto(page, pageSize, count);

      expect(res).toMatchObject({
        page,
        pageSize,
        count,
        totalPages: 5,
      });
    });
  });
});
