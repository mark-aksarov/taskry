"use client";

import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";
import { useCurrentUser } from "@/common/CurrentUserContext";

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
  signOut: () => Promise<ActionState>;
  renderButton: (props: ButtonProps) => React.ReactNode;
  renderLink: (props: LinkProps) => React.ReactNode;
}

export function GetStartedAction({
  signOut,
  renderButton,
  renderLink,
}: GetStartedActionProps) {
  const t = useTranslations("site.home.GetStartedAction");
  const [isPending, startTransition] = useTransition();
  const addErrorToast = useAddErrorToast();
  const router = useRouter();
  const { isGuest, isEmailVerified, userId } = useCurrentUser();

  function handlePress() {
    startTransition(async () => {
      const result = await signOut();

      if (result.status === "error") {
        addErrorToast(result.message!);
        return;
      }

      router.push("/sign-in");
    });
  }

  // If the user is not a guest, we redirect to sign-in page
  if (isGuest) {
    return renderButton({
      isPending,
      handlePress,
      label: t("label"),
    });
  }

  // If user is not signed in, we redirect to sign-in page
  // If user is signed in and email is not verified, we redirect to verify-email page
  // If user is signed in and email is verified, we redirect to dashboard
  const href = !userId
    ? "/sign-in"
    : isEmailVerified
      ? "/dashboard"
      : "/verify-email";

  return renderLink({
    href,
    label: t("label"),
  });
}
