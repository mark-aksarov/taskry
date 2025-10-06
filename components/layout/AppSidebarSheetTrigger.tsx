"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Button,
  SideSheet,
  Dialog,
  RACHeading,
  DialogCloseButton,
} from "@/components/ui";
import { AppSidebar } from "./AppSidebar/AppSidebar";
import { AppSidebarHeader } from "./AppSidebar/AppSidebarHeader";
import { headingStyles } from "./AppSidebar/AppSidebarHeading";
import { AppSidebarBody } from "./AppSidebar/AppSidebarBody";
import { AppNavigation } from "./AppNavigation";

export function AppSidebarSheetTrigger() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-label="menu"
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
                <RACHeading slot="title" level={2} className={headingStyles}>
                  Taskry
                </RACHeading>
                <DialogCloseButton
                  iconSize={20}
                  onPress={() => setOpen(false)}
                />
              </div>
            </AppSidebarHeader>
            <AppSidebarBody>
              <AppNavigation />
            </AppSidebarBody>
          </AppSidebar>
        </Dialog>
      </SideSheet>
    </>
  );
}
