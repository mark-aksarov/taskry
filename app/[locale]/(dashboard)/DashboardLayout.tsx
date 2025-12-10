import {
  AppSidebar,
  AppSidebarBody,
  AppSidebarHeader,
  AppSidebarHeading,
} from "@/components/layout/AppSidebar";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppNavigation } from "@/components/layout/AppNavigation";
import { AppBottomSheetTrigger } from "@/components/layout/AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "@/components/layout/AppSidebarSheetTrigger";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar className="sticky top-0 z-2 h-screen flex-none shadow-lg max-xl:hidden">
        <AppSidebarHeader>
          <AppSidebarHeading />
        </AppSidebarHeader>
        <AppSidebarBody>
          <AppNavigation />
        </AppSidebarBody>
      </AppSidebar>

      <div className="flex flex-auto flex-col">
        <AppHeader
          appBottomSheetTrigger={
            <AppBottomSheetTrigger appNavigation={<AppNavigation />} />
          }
          appSidebarSheetTrigger={
            <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
          }
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
