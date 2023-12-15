import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ReactQueryProvider } from "./provider/react-query-provider";

export const metadata: Metadata = {
  title: "Repub",
  description: "a simple reader which can read your epub files online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
