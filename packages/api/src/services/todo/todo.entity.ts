import * as yup from "yup";

export type TodoEntity = {
  id?: string;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export const TodoSchema = yup.object().shape({
  id: yup.string().optional(),
  title: yup.string().required(),
  description: yup.string().optional(),
  createdAt: yup.date().optional(),
  updatedAt: yup.date().optional(),
  deletedAt: yup.date().optional(),
});
