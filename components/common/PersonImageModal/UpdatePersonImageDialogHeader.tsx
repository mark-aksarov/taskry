import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/Dialog";

interface UpdatePersonImageDialogHeaderProps {
  setImageFile: (file: File | null) => void;
}

export function UpdatePersonImageDialogHeader({
  setImageFile,
}: UpdatePersonImageDialogHeaderProps) {
  const t = useTranslations("common.UpdatePersonImageDialog");

  return (
    <DialogHeader>
      <div className="flex items-center gap-4">
        <Button
          onPress={() => setImageFile(null)}
          variant="outlined"
          iconLeft={
            <ChevronLeft size={16} absoluteStrokeWidth strokeWidth={1.5} />
          }
        />
        {t("heading")}
      </div>
    </DialogHeader>
  );
}
