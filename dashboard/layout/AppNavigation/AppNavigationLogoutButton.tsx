"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { useLocale, useTranslations } from "next-intl";
import { NavigationButton } from "@/dashboard/common/NavigationButton";

export function AppNavigationLogoutButton() {
  const t = useTranslations("dashboard.layout.AppNavigationLogoutButton");

  const router = useRouter();
  const locale = useLocale();

  function logout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in", { locale });
        },
      },
    });
  }

  return (
    <>
      <NavigationButton
        data-test="sign-out-btn"
        onPress={logout}
        iconLeft={<LogOut size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={t("logout")}
      />
    </>
  );
}
