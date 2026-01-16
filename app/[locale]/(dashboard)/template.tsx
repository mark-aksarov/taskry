import DashboardTemplate from "./DashboardTemplate";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export default async function AppDashboardTemplate({
  children,
}: DashboardTemplateProps) {
  const guestMode = await hasGuestRole();

  return (
    <DashboardTemplate guestMode={guestMode}>{children}</DashboardTemplate>
  );
}
