import { useTranslations } from "next-intl";
import { AppNavigationInner } from "./AppNavigationInner";

export const AppNavigation = () => {
  const t = useTranslations("AppNavigation");

  return (
    <AppNavigationInner
      messages={{
        dashboard: t("dashboard"),
        projects: t("projects"),
        tasks: t("tasks"),
        team: t("team"),
        customers: t("customers"),
        profile: t("profile"),
        logout: t("logout"),
      }}
    />
  );
};
