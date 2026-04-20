import {
  DashboardCard,
  DashboardCardIcon,
} from "@/dashboard/common/DashboardCard";

import { useTranslations } from "next-intl";
import { IconlyWork } from "@/icons/IconlyWork";
import { DashboardCardText } from "@/dashboard/common/DashboardCard";

export const TotalProjectsCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("dashboard.projects.TotalProjectsCard");

  return (
    <DashboardCard
      text={<DashboardCardText>{t("text")}</DashboardCardText>}
      icon={
        <DashboardCardIcon color="blue">
          <IconlyWork size={24} />
        </DashboardCardIcon>
      }
      value={children}
    />
  );
};
