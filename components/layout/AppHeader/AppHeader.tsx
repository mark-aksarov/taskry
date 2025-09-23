"use client";

import { twMerge } from "tailwind-merge";
import { SearchForm } from "../SearchForm";
import { ProfileLink } from "../ProfileLink";
import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import {
  AppSidebar,
  AppSidebarBody,
  AppSidebarHeader,
  headingStyles,
} from "../AppSidebar";
import { Bell, Menu, Search, Sun } from "lucide-react";
import { useOverlayTriggerState } from "react-stately";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Dialog, DialogBody } from "@/components/ui/Dialog";
import { AppNavigation } from "../AppNavigation";
import { SideSheet } from "@/components/ui/SideSheet";
import { DialogCloseButton } from "@/components/ui/Dialog/Dialog";
import { Heading } from "react-aria-components";
import { useState } from "react";
import { LangMenuTriggerWithPopover } from "../LangMenuTrigger";

interface AppHeaderProps {
  title: string;
}

export const AppHeader = ({ title }: AppHeaderProps) => {
  const buttonClasses = "rounded-full p-3";

  const [isSidebarOpen, setOpenSidebar] = useState(false);

  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <header className="sticky top-0 z-1 border-b border-gray-300 bg-gray-100 text-black max-md:p-4 md:px-7.5 md:py-4 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
        <div className="flex w-full items-center gap-8 max-md:hidden">
          {
            <div className="flex items-center gap-4">
              <Button
                aria-label="menu"
                variant="ghost"
                iconLeft={
                  <Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
                className={twMerge(buttonClasses, "max-md:hidden xl:hidden")}
                onPress={() => setOpenSidebar(true)}
              />
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
          }
          <div className="flex w-full items-center justify-end gap-4">
            <SearchForm />
            <Button
              aria-label="notifications"
              variant="ghost"
              iconLeft={
                <Bell size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              className={buttonClasses}
            />
            <Button
              aria-label="theme"
              variant="ghost"
              iconLeft={<Sun size={16} strokeWidth={1.5} absoluteStrokeWidth />}
              className={buttonClasses}
            />
            <LangMenuTriggerWithPopover />
            <ProfileLink />
          </div>
        </div>

        <div className="flex w-full items-center justify-between md:hidden">
          <ProfileLink />
          <div className="flex items-center gap-3">
            <Button
              aria-label="theme"
              variant="ghost"
              iconLeft={
                <Search size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              className={buttonClasses}
            />
            <Button
              aria-label="notifications"
              variant="ghost"
              iconLeft={
                <Bell size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              className={buttonClasses}
            />
            <Button
              {...triggerProps}
              aria-label="language"
              variant="ghost"
              iconLeft={
                <Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              className={buttonClasses}
            />
          </div>
        </div>
      </header>

      <SideSheet
        isDismissable
        side="left"
        isOpen={isSidebarOpen}
        onOpenChange={setOpenSidebar}
      >
        <Dialog>
          <AppSidebar>
            <AppSidebarHeader>
              <div className="flex items-center justify-between">
                <Heading slot="title" level={2} className={headingStyles}>
                  Taskry
                </Heading>
                <DialogCloseButton onPress={() => setOpenSidebar(false)} />
              </div>
            </AppSidebarHeader>
            <AppSidebarBody>
              <AppNavigation />
            </AppSidebarBody>
          </AppSidebar>
        </Dialog>
      </SideSheet>

      <BottomSheet isDismissable state={state}>
        <Dialog
          aria-label="App navigation"
          className="max-h-[calc(100dvh-64px)]"
        >
          <DialogBody className="px-3 py-4">
            <AppNavigation />
          </DialogBody>
        </Dialog>
      </BottomSheet>
    </>
  );
};
