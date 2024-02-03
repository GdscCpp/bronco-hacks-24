import { GeistSans } from "geist/font/sans";
import "./globals.css";
import CoursesSidebar from "@/components/courses-sidebar";
import NotesEditor from "@/components/editor";

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
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="h-full w-full bg-black">
        <main className="h-screen w-full bg-black">
          <CoursesSidebar />
          {children}
            <NotesEditor />
        </main>
      </body>
    </html>
  );
}
