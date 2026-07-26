"use client";

import { Button } from "@/ui/Button";
import { useTransition } from "react";
import { UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";
import { acceptInvitation } from "@/lib/actions/auth/acceptInvitation";

interface AcceptInvitationButtonProps {
  invitationId: string;
}

export function AcceptInvitationButton({
  invitationId,
}: AcceptInvitationButtonProps) {
  const t = useTranslations("auth.AcceptInvitationButton");
  const [isPending, startTransition] = useTransition();
  const addErrorToast = useAddErrorToast();

  const handlePress = () => {
    startTransition(async () => {
      const result = await acceptInvitation(invitationId);

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
      iconLeft={<UserRoundPlus size={18} />}
      label={t("label")}
      size="medium"
    />
  );
}
