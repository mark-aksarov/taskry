import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/ui/Button";
import { useUpdateComment } from "./UpdateCommentContext";
import { useCommentFormContext } from "./CommentFormContext";

export function CommentCancelEditingButton() {
  const t = useTranslations("dashboard.comments.CommentCancelEditingButton");
  const { editCommentId, setEditCommentId, setCommentContent } =
    useCommentFormContext();

  const { isPending: isUpdateCommentPending } = useUpdateComment();

  if (!editCommentId) return null;

  function handlePress() {
    setEditCommentId(undefined);
    setCommentContent("");
  }

  return (
    <Button
      variant="primary"
      outlined
      className="z-1 mt-4 ml-4 gap-1 px-2 py-1 text-xs"
      onPress={handlePress}
      label={t("label")}
      iconLeft={<X size={14} className="-ml-1" />}
      isDisabled={isUpdateCommentPending}
    />
  );
}
