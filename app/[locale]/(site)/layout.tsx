import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SiteLayout } from "./SiteLayout";
import { SessionProvider } from "@/common/SessionContext";

export default async function AppSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SessionProvider value={session}>
      <SiteLayout>{children}</SiteLayout>
    </SessionProvider>
  );
}
