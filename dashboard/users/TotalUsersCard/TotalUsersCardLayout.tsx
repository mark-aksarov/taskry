import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
} from "@/dashboard/common/DashboardCard";
import { useTranslations } from "next-intl";
import { IconlyUser } from "@/icons/IconlyUser";

export const TotalUsersCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("dashboard.users.TotalUsersCard");

  return (
    <DashboardCard
      text={<DashboardCardText>{t("text")}</DashboardCardText>}
      icon={
        <DashboardCardIcon color="red">
          <IconlyUser size={24} />
        </DashboardCardIcon>
      }
      value={children}
    />
  );
};
