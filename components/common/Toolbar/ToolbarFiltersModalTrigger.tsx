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
      />
      <Modal isDismissable className="w-[500px]">
        <Dialog className="max-h-[calc(100dvh-64px)]">
          <DialogHeader>
            <DialogHeading>{title}</DialogHeading>
            <DialogCloseButton iconSize={20} />
          </DialogHeader>
          <DialogBody className="text-black dark:text-white">
            {filtersForm}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="primary"
              size="medium"
              label="Apply Filters"
              className="w-full justify-center"
            />
          </DialogFooter>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
