"use client";

import { SideSheet } from "../ui/SideSheet";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui/Dialog";

export function ProjectFiltersSideSheetTrigger({
  projectFiltersForm,
}: {
  projectFiltersForm: React.ReactNode;
}) {
  return (
    <DialogTrigger>
      <Button
        label="Filters"
        variant="outlined"
        iconLeft={
          <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />
      <SideSheet isDismissable>
        <Dialog className="w-[360px]">
          <DialogHeader>
            <DialogHeading>Filters</DialogHeading>
            <DialogCloseButton iconSize={20} />
          </DialogHeader>
          <DialogBody className="text-black dark:text-white">
            {projectFiltersForm}
          </DialogBody>
        </Dialog>
      </SideSheet>
    </DialogTrigger>
  );
}
