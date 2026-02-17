import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CommentTextFieldSendButtonProps {
  buttonClasses?: string;
  isDisabled?: boolean;
}

export function CommentTextFieldSendButton({
  buttonClasses,
  isDisabled,
}: CommentTextFieldSendButtonProps) {
  const t = useTranslations("comments.CommentTextFieldSendButton");

  return (
    <Button
      type="submit"
      data-test="comment-text-field-send-button"
      iconLeft={
        <SendHorizonal size={16} strokeWidth={1.25} absoluteStrokeWidth />
      }
      className={twMerge(buttonClasses, "right-0 -translate-x-2")}
      isDisabled={isDisabled}
      aria-label={t("ariaLabel")}
    />
  );
}
