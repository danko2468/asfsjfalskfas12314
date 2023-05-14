import * as yup from "yup";

export type TodoFilterDto = {
  page?: number;
  pageSize?: number;
  keywords?: string;
};

export const TodoFilterDtoSchema = yup.object().shape({
  page: yup.number().default(0),
  pageSize: yup.number().default(24),
  keywords: yup.string().optional(),
});
