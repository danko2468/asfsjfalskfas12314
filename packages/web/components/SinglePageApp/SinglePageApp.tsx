"use client";
import { Settings } from "luxon";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

import { AppContext } from "~/components/AppLayer/mod";
import { TodoDetailWrapper, TodoList } from "~/components/Todo/mod";
import { DeviceType } from "~/lib/Screen/constants";

Settings.defaultLocale = "en-GB";

export function SinglePageApp() {
  const { deviceType, id } = useContext(AppContext);

  return (
    <>
      <main className="grid h-[100vh] w-full grid-cols-6 grid-rows-1">
        <section className="col-span-6 row-span-1 tablet:col-span-2">
          {!id || deviceType !== DeviceType.Mobile ? <TodoList /> : <TodoDetailWrapper />}
        </section>
        <section className="col-span-4 row-span-1 hidden tablet:block">
          {deviceType !== DeviceType.Mobile && <TodoDetailWrapper />}
        </section>
      </main>
      <ToastContainer />
    </>
  );
}
