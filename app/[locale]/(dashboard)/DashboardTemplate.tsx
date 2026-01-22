import { AppHeader } from "@/components/layout/AppHeader";
import { AppNavigation } from "@/components/layout/AppNavigation";
import { AppBottomSheetTrigger } from "@/components/layout/AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "@/components/layout/AppSidebarSheetTrigger";

interface DashboardTemplateProps {
  notificationModalContentContainer: React.ReactNode;
  searchModal: React.ReactNode;
  children: React.ReactNode;
}

export default async function DashboardTemplate({
  notificationModalContentContainer,
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
        notificationModalContentContainer={notificationModalContentContainer}
      />
      <main>{children}</main>
    </div>
  );
}
