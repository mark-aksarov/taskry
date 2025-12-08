import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { DashboardLayout } from "./DashboardLayout";
import { NotificationModalContentServerContainer } from "@/components/notifications/NotificationModalContentServerContainer";

export default async function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  if (!session!.user.emailVerified) {
    redirect({ href: "/verify-email", locale });
  }

  return (
    <DashboardLayout
      NotificationModalContentContainer={
        NotificationModalContentServerContainer
      }
    >
      {children}
    </DashboardLayout>
  );
}
