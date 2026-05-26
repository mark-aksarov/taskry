"use client";

import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";
import { NavigationButton } from "@/dashboard/common/NavigationItem";

interface AppNavigationLogoutButtonProps {
  signOut: () => Promise<ActionState>;
}

export function AppNavigationLogoutButton({
  signOut,
}: AppNavigationLogoutButtonProps) {
  const t = useTranslations("dashboard.layout.AppNavigationLogoutButton");
  const [isPending, startTransition] = useTransition();
  const addErrorToast = useAddErrorToast();
  const router = useRouter();

  function logout() {
    startTransition(async () => {
      const result = await signOut();

      if (result.status === "error") {
        addErrorToast(result.message!);
        return;
      }

      router.push("/dashboard");
    });
  }

  return (
    <>
      <NavigationButton
        data-test="sign-out-btn"
        onPress={logout}
        isPending={isPending}
        iconLeft={<LogOut size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={t("logout")}
      />
    </>
  );
}
