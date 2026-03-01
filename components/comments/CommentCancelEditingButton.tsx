import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useCommentFormContext } from "./CommentFormContext";
import { useSendCommentTransition } from "./SendCommentTransitionContext";

export function CommentCancelEditingButton() {
  const t = useTranslations("comments.CommentCancelEditingButton");
  const { editCommentId, setEditCommentId, setCommentContent } =
    useCommentFormContext();

  const { isPending: isSendCommentPending } = useSendCommentTransition();

  if (!editCommentId) return null;

  function handlePress() {
    setEditCommentId(undefined);
    setCommentContent("");
  }

  return (
    <Button
      variant="outlined"
      className="mt-4 ml-4 gap-1 px-2 py-1 text-xs"
      onPress={handlePress}
      label={t("label")}
      iconLeft={<X size={14} className="-ml-1" />}
      isDisabled={isSendCommentPending}
    />
  );
}
