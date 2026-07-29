import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { RoleProvider } from "@/common/RoleContext";
import { DashboardLayout } from "./DashboardLayout";
import { SessionProvider } from "@/common/SessionContext";
import { ProfileLinkContainer } from "@/dashboard/layout/ProfileLinkContainer";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

export default async function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Authorization
  const session = await requireFullAccess();
  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });

  return (
    <SessionProvider value={session}>
      <RoleProvider value={role}>
        <DashboardLayout profileLinkContainer={<ProfileLinkContainer />}>
          {children}
        </DashboardLayout>
      </RoleProvider>
    </SessionProvider>
  );
}
