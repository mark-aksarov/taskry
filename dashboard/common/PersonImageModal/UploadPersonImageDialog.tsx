import { useState } from "react";
import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { ErrorBanner } from "@/common/ErrorBanner";
import { Dialog, DialogBody, DialogFooter } from "@/ui/Dialog";
import { PersonImageFileTrigger } from "../PersonImageFileTrigger";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

const styles = tv({
  slots: {
    body: "flex flex-col items-center gap-4",
    text: "text-center text-sm text-black dark:text-white",
    footer: "flex justify-end gap-4",
  },
});

export function UploadPersonImageDialog({
  setImageFile,
}: {
  setImageFile: (file: File) => void;
}) {
  const t = useTranslations("dashboard.common.UploadPersonImageDialog");
  const [error, setError] = useState<string | null>(null);

  const { body, text, footer } = styles();

  return (
    <Dialog>
      <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>

      <DialogBody className={body()}>
        <div className={text()}>{t("text")}</div>

        {error && <ErrorBanner>{error}</ErrorBanner>}
      </DialogBody>

      <DialogFooter className={footer()}>
        <PersonImageFileTrigger
          setImageFile={setImageFile}
          setError={setError}
        />
      </DialogFooter>
    </Dialog>
  );
}
