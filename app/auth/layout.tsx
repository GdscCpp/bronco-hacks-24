export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={"w-full h-screen bg-primary-500"}>{children}</div>;
}
