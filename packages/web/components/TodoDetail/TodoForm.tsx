import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import type { PropsWithoutRef } from "react";
import type { TodoDto } from "~/lib/types";

type Props = {
  defaultValue?: Pick<TodoDto, "title" | "description">;
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().optional(),
});

export function TodoForm({ defaultValue }: PropsWithoutRef<Props>) {
  const { register } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValue ?? {
      title: "",
      description: "",
    },
  });

  return (
    <form>
      <div className="text-3xl text-neutral-300">Title</div>
      <input {...register("title")} placeholder="what is it?" />
      <div className="text-3xl text-neutral-300">Description (optional)</div>
      <textarea {...register("description")} placeholder="for more information, e.g. address, link" />
    </form>
  );
}
