import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
} from "@/components/common/DashboardCard";
import { useTranslations } from "next-intl";
import { IconlyUser } from "@/components/icons/IconlyUser";

export const TotalUsersCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("users.TotalUsersCard");

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
