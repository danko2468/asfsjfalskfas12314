import * as yup from "yup";

export type TodoFilterDto = {
  page: number;
  pageSize: number;
  keywords?: string;
  sortOrder: "asc" | "desc";
  archived?: boolean;
};

export const TodoFilterDtoSchema = yup.object().shape({
  page: yup.number().required(),
  pageSize: yup.number().required(),
  keywords: yup.string().optional(),
  sortOrder: yup.string().oneOf(["asc", "desc"]).required(),
  archived: yup.boolean().optional(),
});
