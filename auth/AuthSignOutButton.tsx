"use client";

import { Button } from "@/ui/Button";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";

interface AuthSignOutButtonProps {
  signOut: () => Promise<ActionState>;
}

export function AuthSignOutButton({ signOut }: AuthSignOutButtonProps) {
  const t = useTranslations("auth.AuthSignOutButton");
  const [isPending, startTransition] = useTransition();
  const addErrorToast = useAddErrorToast();
  const router = useRouter();

  function handlePress() {
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
    <Button
      variant="accent"
      className="justify-center py-4"
      size="medium"
      onPress={handlePress}
      isPending={isPending}
      label={t("label")}
    />
  );
}
