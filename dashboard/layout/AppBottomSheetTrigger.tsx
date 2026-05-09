"use client";

import { useRef } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/ui/Button";
import { useTranslations } from "next-intl";
import { useOverlayTrigger } from "react-aria";
import { BottomSheet } from "@/ui/BottomSheet";
import { Dialog, DialogBody } from "@/ui/Dialog";
import { useOverlayTriggerState } from "react-stately";

export function AppBottomSheetTrigger({
  appNavigation,
}: {
  appNavigation: React.ReactNode;
}) {
  const t = useTranslations("dashboard.layout.AppBottomSheetTrigger");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button
        {...triggerProps}
        ref={triggerRef}
        aria-label={t("triggerAriaLabel")}
        variant="secondary"
        iconLeft={<Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="-mr-2 rounded-full p-3"
      />

      <BottomSheet isDismissable state={state}>
        <Dialog
          aria-label={t("dialogAriaLabel")}
          className="max-h-[calc(100dvh-64px)]"
        >
          <DialogBody className="px-3 py-4">{appNavigation}</DialogBody>
        </Dialog>
      </BottomSheet>
    </>
  );
}
