"use client";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { FileTrigger } from "react-aria-components";
import { ConfirmModalConfirmButton } from "@/common/ConfirmModal";

interface ImportModalUploadTriggerProps {
  action: (payload: FormData) => void;
  isPending: boolean;
  setFileError: (value: boolean) => void;
}

export function ImportModalUploadTrigger({
  action,
  isPending,
  setFileError,
}: ImportModalUploadTriggerProps) {
  const t = useTranslations("dashboard.common.ImportModalUploadTrigger");

  const handleSelect = (e: FileList | null) => {
    const file = e?.[0];
    if (!file) return;

    // Check file size
    const maxSize = 512 * 1024;
    if (file.size > maxSize) {
      setFileError(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(() => action(formData));
  };

  return (
    <FileTrigger acceptedFileTypes={["text/csv"]} onSelect={handleSelect}>
      <ConfirmModalConfirmButton
        data-test="import-modal-upload-button"
        label={t("label")}
        isPending={isPending}
      />
    </FileTrigger>
  );
}
