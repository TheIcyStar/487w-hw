import Link from "next/link"
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "APetrov 487w P1",
  description: "SUN Lab Access System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="bg-amber-700 text-gray-200 py-2">
          <Link href="/" className="text-4xl inline px-2">MROS</Link>
          <p className="text-2xl font-light italic inline px-2">@ Campus Lows</p>
        </div>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
