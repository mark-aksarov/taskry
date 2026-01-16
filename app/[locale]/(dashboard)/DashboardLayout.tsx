import {
  AppSidebar,
  AppSidebarBody,
  AppSidebarHeader,
  AppSidebarHeading,
} from "@/components/layout/AppSidebar";
import { AppNavigation } from "@/components/layout/AppNavigation";

interface DashboardLayoutProps {
  guestMode?: boolean;
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
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

      {children}
    </div>
  );
}
