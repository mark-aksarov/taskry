import { DialogHeader, DialogHeading, DialogCloseButton } from "@/ui/Dialog";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/ui/Button";

interface UpdatePersonImageDialogHeaderProps {
  setImageFile: (file: File | null) => void;
}

export function UpdatePersonImageDialogHeader({
  setImageFile,
}: UpdatePersonImageDialogHeaderProps) {
  const t = useTranslations("dashboard.common.UpdatePersonImageDialog");

  return (
    <DialogHeader>
      <div className="flex items-center gap-4">
        <Button
          onPress={() => setImageFile(null)}
          variant="primary"
          outlined
          iconLeft={
            <ChevronLeft    />
          }
        />
        <DialogHeading>{t("heading")}</DialogHeading>
      </div>
      <DialogCloseButton />
    </DialogHeader>
  );
}
