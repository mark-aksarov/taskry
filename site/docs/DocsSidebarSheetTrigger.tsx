"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/ui/Button";
import { Logo } from "../layout/Logo";
import { SideSheet } from "@/ui/SideSheet";
import { useTranslations } from "next-intl";
import { Dialog, DialogBody } from "@/ui/Dialog";
import { DocsNavigation } from "./DocsNavigation";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

export function DocsSidebarSheetTrigger() {
  const t = useTranslations("site.docs.DocsSidebarSheetTrigger");

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-label={t("triggerAriaLabel")}
        variant="ghost"
        iconLeft={<Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="-ml-3 rounded-full p-3 xl:hidden"
        onPress={() => setOpen(true)}
      />

      <SideSheet
        isDismissable
        side="left"
        isOpen={isOpen}
        onOpenChange={setOpen}
      >
        <Dialog className="bg-slate-50 dark:bg-slate-900">
          <DialogHeaderWithClose className="h-[73px]">
            <Logo />
          </DialogHeaderWithClose>
          <DialogBody>
            <DocsNavigation />
          </DialogBody>
        </Dialog>
      </SideSheet>
    </>
  );
}
