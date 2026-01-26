import {
  DashboardCard,
  DashboardCardIcon,
} from "@/components/common/DashboardCard";

import { useTranslations } from "next-intl";
import { IconlyWork } from "@/components/icons/IconlyWork";
import { DashboardCardText } from "@/components/common/DashboardCard";

export const TotalProjectsCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("projects.TotalProjectsCard");

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
