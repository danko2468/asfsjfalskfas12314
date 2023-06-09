import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import type { PropsWithoutRef } from "react";
import type { TodoDto } from "~/lib/types";

type Props = {
  defaultValue?: Pick<TodoDto, "title" | "description">;
  onSubmit: (data: Pick<TodoDto, "title" | "description">) => void | Promise<void>;
  className?: string;
  fullHeight?: boolean;
  disabled?: boolean;
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().optional(),
});

export function TodoForm({ defaultValue, onSubmit, className, fullHeight }: PropsWithoutRef<Props>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: defaultValue ?? {
      title: "",
      description: "",
    },
  });

  const title = watch("title");

  const isButtonDisabled = useMemo(
    () => !!(!title || errors.description || errors.title),
    [title, errors.title, errors.description]
  );

  useEffect(() => {
    if (!defaultValue) return;
    setValue("title", defaultValue.title);
    setValue("description", defaultValue.description);
  }, [defaultValue, setValue]);

  return (
    <form
      className={clsx(
        "mx-auto flex w-full max-w-[700px] flex-col items-center justify-center p-4",
        fullHeight && "h-full",
        className
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-12 w-full px-4">
        <div className="app_text mb-6 text-3xl">Title *</div>
        <input {...register("title")} placeholder="What is it?" />
        {errors.title && <div className="text-red-800">{errors.title.message}</div>}
      </div>
      <div className="w-full px-4">
        <div className="app_text mb-6 text-3xl">Description</div>
        <textarea {...register("description")} placeholder="For more information, e.g. address, link" />
        {errors.description && <div className="text-red-800">{errors.description.message}</div>}
      </div>
      <div>
        <button type="submit" disabled={isButtonDisabled} className="mt-20">
          Save
        </button>
      </div>
    </form>
  );
}
