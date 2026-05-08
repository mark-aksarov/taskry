import { useTranslations } from "next-intl";
import AvatarEditor from "react-avatar-editor";
import { Button } from "@/ui/Button";
import { startTransition, useState } from "react";

interface UpdatePersonImageActionButtonProps {
  editorRef: React.RefObject<AvatarEditor | null>;
  imageFile: File;
  updatePersonImageAction: (blob: Blob) => void;
  isUpdatePersonImagePending: boolean;
}

export function UpdatePersonImageActionButton({
  editorRef,
  imageFile,
  updatePersonImageAction,
  isUpdatePersonImagePending,
}: UpdatePersonImageActionButtonProps) {
  const t = useTranslations("dashboard.common.UpdatePersonImageDialog");
  const [isBlobPending, setIsBlobPending] = useState(false);

  function handlePress() {
    if (!editorRef.current) return null;

    const canvas = editorRef.current!.getImage();

    setIsBlobPending(true);

    canvas.toBlob((blob) => {
      if (blob) {
        startTransition(() => updatePersonImageAction(blob));
      }

      setIsBlobPending(false);
    }, imageFile.type);
  }

  const isPending = isBlobPending || isUpdatePersonImagePending;

  return (
    <Button
      variant="accent"
      size="medium"
      isPending={isPending}
      label={t("save")}
      className="w-full justify-center"
      onPress={handlePress}
    />
  );
}
