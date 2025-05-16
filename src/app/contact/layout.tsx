import { Suspense } from "react";

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Suspense>{children}</Suspense>;
}
