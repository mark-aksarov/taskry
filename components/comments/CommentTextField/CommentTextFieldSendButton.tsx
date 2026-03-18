"use client";

import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

interface CommentTextFieldSendButtonProps {
  buttonClasses?: string;
  isDisabled?: boolean;
}

export function CommentTextFieldSendButton({
  buttonClasses,
  isDisabled,
}: CommentTextFieldSendButtonProps) {
  const t = useTranslations("comments.CommentTextFieldSendButton");

  // If the user is a guest, show the guest mode modal instead of allowing action
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  function handlePress() {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
    }
  }

  return (
    <Button
      type={isGuest ? "button" : "submit"}
      data-test="comment-text-field-send-button"
      iconLeft={
        <SendHorizonal size={16} strokeWidth={1.25} absoluteStrokeWidth />
      }
      className={twMerge(buttonClasses, "right-0 -translate-x-2")}
      isDisabled={isDisabled}
      aria-label={t("ariaLabel")}
      onPress={isGuest ? handlePress : undefined}
    />
  );
}
