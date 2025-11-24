"use client";

import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogFooter,
  DialogHeading,
  Modal,
} from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import { ResponsiveModal } from "../ResponsiveModal";

interface ToolbarFiltersModalTriggerProps {
  title: string;
  filtersForm: React.ReactNode;
}

export function ToolbarFiltersModalTrigger({
  title,
  filtersForm,
}: ToolbarFiltersModalTriggerProps) {
  return (
    <DialogTrigger>
      <Button
        label="Filters"
        variant="outlined"
        iconLeft={
          <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
        className="max-md:hidden"
      />
      <Button
        aria-label="Filters"
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
              variant="primary"
              size="medium"
              label="Apply Filters"
              className="w-full justify-center"
            />
          </DialogFooter>
        </Dialog>
      </ResponsiveModal>
    </DialogTrigger>
  );
}
