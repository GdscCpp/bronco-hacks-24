import { GeistSans } from "geist/font/sans";
import "./globals.css";
import CoursesSidebar from "@/components/courses-sidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Class App - Better than Canvas!",
  description: "The better way to interact with your CPP classes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex h-screen w-full bg-black p-4">
          <CoursesSidebar />
          {children}
      </body>
    </html>
  );
}
