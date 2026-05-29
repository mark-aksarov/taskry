"use client";

import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";

interface ButtonProps {
  isPending: boolean;
  handlePress: () => void;
  label: string;
}

interface LinkProps {
  href: string;
  label: string;
}

interface GetStartedActionProps {
  isGuest: boolean;
  isEmailVerified: boolean;
  signOut: () => Promise<ActionState>;
  renderButton: (props: ButtonProps) => React.ReactNode;
  renderLink: (props: LinkProps) => React.ReactNode;
}

export function GetStartedAction({
  isGuest,
  isEmailVerified,
  signOut,
  renderButton,
  renderLink,
}: GetStartedActionProps) {
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
    return renderButton({
      isPending,
      handlePress,
      label: t("label"),
    });
  }

  return renderLink({
    href: isEmailVerified ? "/dashboard" : "/verify-email",
    label: t("label"),
  });
}
