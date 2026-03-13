import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/Dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ErrorBanner } from "../ErrorBanner";
import { PersonImageFileTrigger } from "../PersonImageFileTrigger";

export function UploadPersonImageDialog({
  setImageFile,
}: {
  setImageFile: (file: File) => void;
}) {
  const t = useTranslations("common.UploadPersonImageDialog");
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogHeader>{t("heading")}</DialogHeader>
      <DialogBody className="flex flex-col items-center gap-4">
        <div className="text-center text-sm text-black dark:text-white">
          {t("text")}
        </div>
        {error && <ErrorBanner>{error}</ErrorBanner>}
      </DialogBody>
      <DialogFooter className="flex justify-end gap-4">
        <PersonImageFileTrigger
          setImageFile={setImageFile}
          setError={setError}
        />
      </DialogFooter>
    </Dialog>
  );
}
