import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
} from "@/components/common/DashboardCard";
import { IconlyUser3 } from "@/components/icons/IconlyUser3";
import { useTranslations } from "next-intl";

export const TotalCustomersCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("customers.TotalCustomersCard");

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
