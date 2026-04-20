import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
} from "@/dashboard/common/DashboardCard";
import { useTranslations } from "next-intl";
import { IconlyCalendar } from "@/icons/IconlyCalendar";

export const TotalTasksCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("dashboard.tasks.TotalTasksCard");

  return (
    <DashboardCard
      text={<DashboardCardText>{t("text")}</DashboardCardText>}
      icon={
        <DashboardCardIcon color="orange">
          <IconlyCalendar size={24} />
        </DashboardCardIcon>
      }
      value={children}
    />
  );
};
