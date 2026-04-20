import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
} from "@/dashboard/common/DashboardCard";

import { useTranslations } from "next-intl";
import { IconlyUser3 } from "@/icons/IconlyUser3";

export const TotalCustomersCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("dashboard.customers.TotalCustomersCard");

  return (
    <DashboardCard
      text={<DashboardCardText>{t("text")}</DashboardCardText>}
      icon={
        <DashboardCardIcon color="green">
          <IconlyUser3 size={24} />
        </DashboardCardIcon>
      }
      value={children}
    />
  );
};
