"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Heading } from "react-aria-components";
import { Button } from "@/components/ui/Button";
import { AppSidebar } from "./AppSidebar/AppSidebar";
import { SideSheet } from "@/components/ui/SideSheet";
import { AppSidebarBody } from "./AppSidebar/AppSidebarBody";
import { headingStyles } from "./AppSidebar/AppSidebarHeading";
import { AppSidebarHeader } from "./AppSidebar/AppSidebarHeader";
import { Dialog, DialogCloseButton } from "@/components/ui/Dialog";

export function AppSidebarSheetTrigger({
  appNavigation,
}: {
  appNavigation: React.ReactNode;
}) {
  const t = useTranslations("layout.AppSidebarSheetTrigger");

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-label={t("triggerAriaLabel")}
        variant="ghost"
        iconLeft={<Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className="rounded-full p-3 max-md:hidden xl:hidden"
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
                <Heading slot="title" level={2} className={headingStyles}>
                  Taskry
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
