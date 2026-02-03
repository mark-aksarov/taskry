import { AppHeader } from "@/components/layout/AppHeader";
import { AppNavigation } from "@/components/layout/AppNavigation";
import { AppBottomSheetTrigger } from "@/components/layout/AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "@/components/layout/AppSidebarSheetTrigger";

interface DashboardTemplateProps {
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function DashboardTemplate({
  searchModal,
  children,
}: DashboardTemplateProps) {
  return (
    <div className="flex flex-auto flex-col">
      <AppHeader
        appBottomSheetTrigger={
          <AppBottomSheetTrigger appNavigation={<AppNavigation />} />
        }
        appSidebarSheetTrigger={
          <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
        }
        searchModal={searchModal}
      />
      <main>{children}</main>
    </div>
  );
}
