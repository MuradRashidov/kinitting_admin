import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSidebar from "@/components/layout/LeftSidebar";
import TopBar from "@/components/layout/TopBar";
import TosterProvider from "@/lib/TosterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knitting - Admin Dashboard",
  description: "Admin dashboard to manage knitting's Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <TosterProvider/>
        <div className='flex max-lg:flex-col text-grey-1'>
            <TopBar/>
            <LeftSidebar/>
            <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
