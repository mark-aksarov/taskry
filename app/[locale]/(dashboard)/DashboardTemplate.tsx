import { AppHeader } from "@/components/layout/AppHeader";
import { AppNavigation } from "@/components/layout/AppNavigation";
import { AppBottomSheetTrigger } from "@/components/layout/AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "@/components/layout/AppSidebarSheetTrigger";

interface DashboardTemplateProps {
  guestMode?: boolean;
  children: React.ReactNode;
}

export default async function DashboardTemplate({
  guestMode,
  children,
}: DashboardTemplateProps) {
  return (
    <div className="flex flex-auto flex-col">
      <AppHeader
        guestMode={guestMode}
        appBottomSheetTrigger={
          <AppBottomSheetTrigger appNavigation={<AppNavigation />} />
        }
        appSidebarSheetTrigger={
          <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
        }
      />
      <main>{children}</main>
    </div>
  );
}
