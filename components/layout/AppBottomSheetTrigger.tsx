"use client";

import { useRef } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { useOverlayTriggerState } from "react-stately";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Dialog, DialogBody, DialogHeader } from "@/components/ui/Dialog";

export function AppBottomSheetTrigger({
  appNavigation,
}: {
  appNavigation: React.ReactNode;
}) {
  const t = useTranslations("layout.AppBottomSheetTrigger");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button
        {...triggerProps}
        ref={triggerRef}
        aria-label={t("triggerAriaLabel")}
        variant="ghost"
        iconLeft={<Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="rounded-full p-3"
      />

      <BottomSheet isDismissable state={state}>
        <Dialog
          aria-label={t("dialogAriaLabel")}
          className="max-h-[calc(100dvh-64px)]"
        >
          <DialogHeader>Taskry</DialogHeader>
          <DialogBody className="px-3 py-4">{appNavigation}</DialogBody>
        </Dialog>
      </BottomSheet>
    </>
  );
}
