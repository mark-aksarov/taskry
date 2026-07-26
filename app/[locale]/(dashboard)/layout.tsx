import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { RoleProvider } from "@/common/RoleContext";
import { DashboardLayout } from "./DashboardLayout";
import { signOut } from "@/lib/actions/auth/signOut";
import { SessionProvider } from "@/common/SessionContext";
import { ProfileLinkContainer } from "@/dashboard/layout/ProfileLinkContainer";
import { verifyProtectedPageSession } from "@/lib/utils/verifyProtectedPageSession";

export default async function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Authorization
  const session = await verifyProtectedPageSession();
  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });

  return (
    <SessionProvider value={session}>
      <RoleProvider value={role}>
        <DashboardLayout
          signOut={signOut}
          profileLinkContainer={<ProfileLinkContainer />}
        >
          {children}
        </DashboardLayout>
      </RoleProvider>
    </SessionProvider>
  );
}
