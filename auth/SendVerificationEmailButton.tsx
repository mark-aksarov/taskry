"use client";

import { Mail } from "lucide-react";
import { Button } from "@/ui/Button";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";

interface SendVerificationEmailButtonProps {
  email: string;
  sendVerificationEmail: (email: string) => Promise<ActionState>;
}

export function SendVerificationEmailButton({
  email,
  sendVerificationEmail,
}: SendVerificationEmailButtonProps) {
  const t = useTranslations("auth.SendVerificationEmailButton");
  const [isPending, startTransition] = useTransition();
  const addErrorToast = useAddErrorToast();

  const handlePress = () => {
    startTransition(async () => {
      const result = await sendVerificationEmail(email);

      if (result.status === "error") {
        addErrorToast(result.message!);
        return;
      }
    });
  };

  return (
    <Button
      outlined
      variant="primary"
      isPending={isPending}
      className="justify-center py-4"
      onPress={handlePress}
      iconLeft={<Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />}
      label={t("label")}
      size="medium"
    />
  );
}
