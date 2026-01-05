"use client";

import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import { ResponsiveModal } from "../ResponsiveModal";

interface ToolbarFiltersModalTriggerProps {
  title: string;
  filtersForm: React.ReactNode;
  formId: string;
}

export function ToolbarFiltersModalTrigger({
  title,
  filtersForm,
  formId,
}: ToolbarFiltersModalTriggerProps) {
  const t = useTranslations("common.Toolbar.ToolbarFiltersModalTrigger");

  return (
    <DialogTrigger>
      <Button
        data-test="toolbar-filters-modal-trigger"
        label={t("trigger.label")}
        variant="outlined"
        iconLeft={
          <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
        className="max-md:hidden"
      />
      <Button
        aria-label={t("trigger.ariaLabel")}
        variant="outlined"
        iconLeft={
          <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
        className="md:hidden"
      />
      <ResponsiveModal isDismissable className="w-[500px]">
        <Dialog className="md:max-h-[calc(100dvh-64px)]">
          <DialogHeader>
            <DialogHeading>{title}</DialogHeading>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>{filtersForm}</DialogBody>
          <DialogFooter>
            <Button
              slot="close"
              type="submit"
              variant="primary"
              form={formId}
              size="medium"
              label={t("applyButtonLabel")}
              className="w-full justify-center"
            />
          </DialogFooter>
        </Dialog>
      </ResponsiveModal>
    </DialogTrigger>
  );
}
