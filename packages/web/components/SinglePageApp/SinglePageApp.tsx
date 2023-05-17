"use client";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

import { AppContext } from "~/components/AppLayer/mod";
import { TodoDetailWrapper } from "~/components/TodoDetail/mod";
import { DeviceType } from "~/lib/Screen/constants";

export function SinglePageApp() {
  const { deviceType } = useContext(AppContext);

  return (
    <>
      <main className="grid h-[100vh] w-full tablet:grid-cols-6 tablet:grid-rows-1">
        <section className="col-span-6 row-span-1 tablet:col-span-2 "></section>
        <section className="col-span-4 row-span-1 hidden tablet:block">
          {deviceType !== DeviceType.Mobile && <TodoDetailWrapper />}
        </section>
      </main>
      <ToastContainer />
    </>
  );
}
