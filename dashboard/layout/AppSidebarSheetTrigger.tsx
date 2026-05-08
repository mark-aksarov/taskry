"use client";

import { Logo } from "./Logo";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/ui/Button";
import { SideSheet } from "@/ui/SideSheet";
import { useTranslations } from "next-intl";
import { Heading } from "react-aria-components";
import { AppSidebar } from "./AppSidebar/AppSidebar";
import { Dialog, DialogCloseButton } from "@/ui/Dialog";
import { AppSidebarBody } from "./AppSidebar/AppSidebarBody";
import { AppSidebarHeader } from "./AppSidebar/AppSidebarHeader";

export function AppSidebarSheetTrigger({
  appNavigation,
}: {
  appNavigation: React.ReactNode;
}) {
  const t = useTranslations("dashboard.layout.AppSidebarSheetTrigger");

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-label={t("triggerAriaLabel")}
        variant="secondary"
        iconLeft={<Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="-mr-3 rounded-full p-3 max-md:hidden xl:hidden"
        onPress={() => setOpen(true)}
      />

      <SideSheet
        isDismissable
        side="left"
        isOpen={isOpen}
        onOpenChange={setOpen}
      >
        <Dialog>
          <AppSidebar>
            <AppSidebarHeader>
              <div className="flex items-center justify-between">
                <Heading slot="title" level={2}>
                  <Logo />
                </Heading>
                <DialogCloseButton
                  iconSize={20}
                  onPress={() => setOpen(false)}
                />
              </div>
            </AppSidebarHeader>
            <AppSidebarBody>{appNavigation}</AppSidebarBody>
          </AppSidebar>
        </Dialog>
      </SideSheet>
    </>
  );
}
