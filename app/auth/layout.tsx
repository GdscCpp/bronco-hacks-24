export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex items-center justify-center bg-primary-500 h-screen w-full"}>
      {children}
    </div>
  );
}
