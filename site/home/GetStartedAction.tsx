"use client";

import {
  PageSectionActionLink,
  PageSectionActionButton,
} from "../common/PageSection";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";

interface GetStartedActionProps {
  isGuest: boolean;
  signOut: () => Promise<ActionState>;
}

export function GetStartedAction({ isGuest, signOut }: GetStartedActionProps) {
  const t = useTranslations("site.home.GetStartedAction");
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

  if (isGuest) {
    return (
      <PageSectionActionButton
        variant="accent"
        isPending={isPending}
        label={t("label")}
        onPress={handlePress}
      />
    );
  }

  return (
    <PageSectionActionLink
      variant="accent"
      href="/dashboard"
      label={t("label")}
    />
  );
}
