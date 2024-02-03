import { GeistSans } from "geist/font/sans";
import "./globals.css";
import CoursesSidebar from "@/components/courses-sidebar";
import NotesEditor from "@/components/editor";
import { headers } from "next/headers";
import { ROUTES } from "@/config/routes";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const pathname = headerList.get("x-path") || "";
  console.log(pathname);
  const SIDEBAR_PATHS = [ROUTES.SIGN_IN, ROUTES.SIGN_UP, '/test'];
  const showSidebar = !SIDEBAR_PATHS.some((route) => pathname === route);
  

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="h-full w-full bg-black">
        <main className={`h-screen w-full ${showSidebar && 'bg-black'} `}>
        {showSidebar ? <CoursesSidebar /> : null}
          {children}
          {showSidebar ? <NotesEditor /> : null}
        </main>
      </body>
    </html>
  );
}
