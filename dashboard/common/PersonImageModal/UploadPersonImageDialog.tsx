import { useState } from "react";
import { useTranslations } from "next-intl";
import { ErrorBanner } from "../ErrorBanner";
import { DialogHeaderWithClose } from "../DialogHeaderWithClose";
import { PersonImageFileTrigger } from "../PersonImageFileTrigger";
import { Dialog, DialogBody, DialogFooter } from "@/ui/Dialog";

export function UploadPersonImageDialog({
  setImageFile,
}: {
  setImageFile: (file: File) => void;
}) {
  const t = useTranslations("dashboard.common.UploadPersonImageDialog");
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
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
