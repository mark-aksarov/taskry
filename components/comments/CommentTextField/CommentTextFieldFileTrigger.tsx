import { Paperclip } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import { FileTrigger } from "react-aria-components";

type CommentTextFieldFileTriggerProps = {
  onFilesSelect: (files: FileList) => void;
  buttonClasses: string;
  isDisabled?: boolean;
};

export function CommentTextFieldFileTrigger({
  onFilesSelect,
  buttonClasses,
  isDisabled,
}: CommentTextFieldFileTriggerProps) {
  const t = useTranslations("common.CommentTextField");

  return (
    <FileTrigger
      allowsMultiple
      acceptedFileTypes={["image/*"]}
      onSelect={(e) => {
        if (e) {
          onFilesSelect(e);
        }
      }}
    >
      <Button
        variant="ghost"
        iconLeft={<Paperclip size={16} strokeWidth={1} absoluteStrokeWidth />}
        className={twMerge(buttonClasses, "translate-x-2")}
        isDisabled={isDisabled}
        aria-label={t("attachFileButton.ariaLabel")}
      />
    </FileTrigger>
  );
}
