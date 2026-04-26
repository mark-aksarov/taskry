"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { PageSectionAction } from "../common/PageSection";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";

interface DemoButtonProps {
  signInAsDemoUser: () => Promise<ActionState>;
}

export function DemoButton({ signInAsDemoUser }: DemoButtonProps) {
  const t = useTranslations("site.blocks.CtaActions");
  const addErrorToast = useAddErrorToast();

  const [isPending, startTransition] = useTransition();

  function handlePress() {
    startTransition(async () => {
      const state = await signInAsDemoUser();

      if (state.status === "error") {
        addErrorToast(state.message!);
      }
    });
  }

  return (
    <PageSectionAction
      isPending={isPending}
      onPress={handlePress}
      variant="outlined"
      label={t("DemoButton.label")}
    />
  );
}
