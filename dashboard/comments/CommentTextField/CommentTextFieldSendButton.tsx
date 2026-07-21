"use client";

import { Button } from "@/ui/Button";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { SendHorizonal } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { useCurrentUser } from "@/common/CurrentUserContext";

interface CommentTextFieldSendButtonProps {
  buttonClasses?: string;
  isDisabled?: boolean;
}

export function CommentTextFieldSendButton({
  buttonClasses,
  isDisabled,
}: CommentTextFieldSendButtonProps) {
  const t = useTranslations("dashboard.comments.CommentTextFieldSendButton");

  // If the user is a guest, show the guest mode modal instead of allowing action
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useModal("guestMode");

  function handlePress() {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
    }
  }

  return (
    <Button
      variant="accent"
      type={isGuest ? "button" : "submit"}
      data-test="comment-text-field-send-button"
      iconLeft={<SendHorizonal strokeWidth={1.25} />}
      className={twMerge(buttonClasses, "right-0 -translate-x-2")}
      isDisabled={isDisabled}
      aria-label={t("ariaLabel")}
      onPress={isGuest ? handlePress : undefined}
    />
  );
}
