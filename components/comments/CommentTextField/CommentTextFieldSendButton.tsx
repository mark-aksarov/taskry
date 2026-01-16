import { Button } from "@/components/ui";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { SendHorizonal } from "lucide-react";

interface CommentTextFieldSendButtonProps {
  buttonClasses: string;
  isDisabled?: boolean;
}

export function CommentTextFieldSendButton({
  buttonClasses,
  isDisabled,
}: CommentTextFieldSendButtonProps) {
  const t = useTranslations("common.CommentTextField");

  return (
    <Button
      variant="ghost"
      iconLeft={<SendHorizonal size={16} strokeWidth={1} absoluteStrokeWidth />}
      className={twMerge(buttonClasses, "right-0 -translate-x-2")}
      isDisabled={isDisabled}
      aria-label={t("sendButton.ariaLabel")}
    />
  );
}
