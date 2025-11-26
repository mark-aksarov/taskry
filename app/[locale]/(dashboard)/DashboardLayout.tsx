import {
  AppSidebar,
  AppSidebarBody,
  AppSidebarHeader,
  AppSidebarHeading,
} from "@/components/layout/AppSidebar";
import { Suspense } from "react";
import { Repeat } from "@/components/common/Repeat";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppNavigation } from "@/components/layout/AppNavigation";
import { AppBottomSheetTrigger } from "@/components/layout/AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "@/components/layout/AppSidebarSheetTrigger";
import { NotificationModalTrigger } from "@/components/notifications/NotificationModalTrigger";
import { NotificationListItemSkeleton } from "@/components/notifications/NotificationListItem";
import { useTranslations } from "next-intl";

export function DashboardLayout({
  NotificationModalContentContainer,
  children,
}: {
  NotificationModalContentContainer: React.ComponentType;
  children: React.ReactNode;
}) {
  const t = useTranslations("AppNavigation");

  const notificationListSkeleton = (
    <Repeat items={7} renderItem={() => <NotificationListItemSkeleton />} />
  );

  const appNavigation = (
    <AppNavigation
      messages={{
        dashboard: t("dashboard"),
        projects: t("projects"),
        tasks: t("tasks"),
        team: t("team"),
        customers: t("customers"),
        profile: t("profile"),
        logout: t("logout"),
      }}
    />
  );

  return (
    <div className="flex">
      <AppSidebar className="sticky top-0 z-2 h-screen flex-none shadow-lg max-xl:hidden">
        <AppSidebarHeader>
          <AppSidebarHeading />
        </AppSidebarHeader>
        <AppSidebarBody>{appNavigation}</AppSidebarBody>
      </AppSidebar>

      <div className="flex flex-auto flex-col">
        <AppHeader
          notificationModalTrigger={
            <NotificationModalTrigger>
              <Suspense fallback={notificationListSkeleton}>
                <NotificationModalContentContainer />
              </Suspense>
            </NotificationModalTrigger>
          }
          appBottomSheetTrigger={
            <AppBottomSheetTrigger appNavigation={appNavigation} />
          }
          appSidebarSheetTrigger={
            <AppSidebarSheetTrigger appNavigation={appNavigation} />
          }
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
