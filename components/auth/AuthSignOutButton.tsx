"use client";

import { Button } from "../ui";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

export function AuthSignOutButton() {
  const t = useTranslations("auth.AuthSignOutButton");

  const router = useRouter();

  function handlePress() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  return (
    <Button
      className="justify-center py-4"
      size="medium"
      onPress={handlePress}
      label={t("label")}
    />
  );
}
