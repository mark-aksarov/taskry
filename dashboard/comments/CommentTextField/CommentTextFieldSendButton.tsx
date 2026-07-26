"use client";

import { Button } from "@/ui/Button";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { SendHorizonal } from "lucide-react";

interface CommentTextFieldSendButtonProps {
  buttonClasses?: string;
  isDisabled?: boolean;
}

export function CommentTextFieldSendButton({
  buttonClasses,
  isDisabled,
}: CommentTextFieldSendButtonProps) {
  const t = useTranslations("dashboard.comments.CommentTextFieldSendButton");

  return (
    <Button
      variant="accent"
      type="submit"
      data-test="comment-text-field-send-button"
      iconLeft={<SendHorizonal strokeWidth={1.25} />}
      className={twMerge(buttonClasses, "right-0 -translate-x-2")}
      isDisabled={isDisabled}
      aria-label={t("ariaLabel")}
    />
  );
}
