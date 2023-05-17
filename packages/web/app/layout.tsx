/* eslint-disable import/order */
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AppLayer } from "~/components/AppLayer/mod";

export const metadata = {
  title: "Todo",
  description: "Manage your todos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppLayer>{children}</AppLayer>
      </body>
    </html>
  );
}
