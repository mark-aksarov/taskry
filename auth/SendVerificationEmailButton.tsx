"use client";

import { Mail } from "lucide-react";
import { Button } from "@/ui/Button";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "@/common/SessionContext";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";
import { sendVerificationEmail } from "@/lib/actions/auth/sendVerificationEmail";

export function SendVerificationEmailButton() {
  const t = useTranslations("auth.SendVerificationEmailButton");
  const [isPending, startTransition] = useTransition();
  const addErrorToast = useAddErrorToast();
  const session = useSession();

  const handlePress = () => {
    startTransition(async () => {
      const result = await sendVerificationEmail(session!.user.email);

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
      iconLeft={<Mail size={18} />}
      label={t("label")}
      size="medium"
    />
  );
}
