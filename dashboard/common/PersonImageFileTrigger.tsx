import { Button } from "@/ui/Button";
import { useTranslations } from "next-intl";
import { FileTrigger } from "react-aria-components";

interface PersonImageFileTriggerProps {
  setImageFile: (file: File) => void;
  setError: (error: string | null) => void;
}

export function PersonImageFileTrigger({
  setImageFile,
  setError,
}: PersonImageFileTriggerProps) {
  const t = useTranslations("dashboard.common.PersonImageFileTrigger");

  return (
    <FileTrigger
      acceptedFileTypes={["image/jpeg", "image/png", "image/webp"]}
      onSelect={(e) => {
        const file = e?.[0];
        if (!file) return;

        // Check file size
        const maxSize = 200 * 1024;
        if (file.size > maxSize) {
          setError(t("error.fileSize"));
          return;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(objectUrl);

          // Check minimum dimensions
          if (img.width < 300 || img.height < 300) {
            setError(t("error.imageSize"));
            return;
          }

          // Check aspect ratio
          const ratio = img.width / img.height;
          const minRatio = 4 / 5;
          const maxRatio = 5 / 4;

          if (ratio < minRatio || ratio > maxRatio) {
            setError(t("error.aspectRatio"));
            return;
          }

          setError(null);
          setImageFile(file);
        };

        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          setError(t("error.unknown"));
        };

        img.src = objectUrl;
      }}
    >
      <Button
        variant="accent"
        size="medium"
        label={t("label")}
        className="w-full justify-center"
      />
    </FileTrigger>
  );
}
