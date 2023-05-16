import { TodoDetailWrapper } from "~/components/TodoDetail/mod";

export default function Home() {
  return (
    <main className="grid h-[100vh] w-full tablet:grid-cols-6 tablet:grid-rows-1">
      <section className="col-span-6 row-span-1 tablet:col-span-2 "></section>
      <section className="col-span-4 row-span-1 hidden tablet:block">
        <TodoDetailWrapper />
      </section>
    </main>
  );
}
