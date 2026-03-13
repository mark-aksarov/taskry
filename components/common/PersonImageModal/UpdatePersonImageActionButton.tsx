import { startTransition } from "react";
import { useTranslations } from "next-intl";
import AvatarEditor from "react-avatar-editor";
import { Button } from "@/components/ui/Button";

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
  const t = useTranslations("common.UpdatePersonImageDialog");

  function handlePress() {
    if (!editorRef.current) return null;

    const canvas = editorRef.current!.getImage();

    canvas.toBlob((blob) => {
      if (blob) {
        startTransition(() => updatePersonImageAction(blob));
      }
    }, imageFile.type);
  }

  return (
    <Button
      variant="primary"
      size="medium"
      isPending={isUpdatePersonImagePending}
      label={t("save")}
      className="w-full justify-center"
      onPress={handlePress}
    />
  );
}
