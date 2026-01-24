"use client";

import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { NavigationButton } from "@/components/common/NavigationButton";

export function AppNavigationLogoutButton() {
  const t = useTranslations("layout.AppNavigationLogoutButton");

  const router = useRouter();

  function logout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  return (
    <>
      <NavigationButton data-test="sign-out-btn" onPress={logout}>
        <LogOut size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("logout")}
      </NavigationButton>
    </>
  );
}
