import {
  AppSidebar,
  AppSidebarBody,
  AppSidebarHeader,
} from "@/dashboard/layout/AppSidebar";

import { Logo } from "@/dashboard/layout/Logo";
import { ActionState } from "@/lib/actions/types";
import { AppNavigation } from "@/dashboard/layout/AppNavigation";

interface DashboardLayoutProps {
  signOut: () => Promise<ActionState>;
  children: React.ReactNode;
}

export function DashboardLayout({ signOut, children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <AppSidebar className="sticky top-0 z-2 h-dvh flex-none shadow-sm max-xl:hidden">
        <AppSidebarHeader>
          <Logo />
        </AppSidebarHeader>
        <AppSidebarBody>
          <AppNavigation signOut={signOut} />
        </AppSidebarBody>
      </AppSidebar>

      {/* flex items have min-width:auto in row; min-w-0 prevents filters overflow when empty filtering results */}
      <div className="flex min-w-0 flex-auto flex-col">{children}</div>
    </div>
  );
}
