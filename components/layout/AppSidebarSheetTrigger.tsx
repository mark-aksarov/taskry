"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { SideSheet } from "../ui/SideSheet";
import { Dialog } from "../ui/Dialog";
import {
  AppSidebar,
  AppSidebarBody,
  AppSidebarHeader,
  headingStyles,
} from "./AppSidebar";
import { Heading } from "react-aria-components";
import { DialogCloseButton } from "../ui/Dialog/Dialog";
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
                <Heading slot="title" level={2} className={headingStyles}>
                  Taskry
                </Heading>
                <DialogCloseButton onPress={() => setOpen(false)} />
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
