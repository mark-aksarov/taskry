"use client";

import { Button } from "@/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogFooter,
  DialogHeading,
  Modal,
} from "@/components/ui";

export function TaskFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  return (
    <DialogTrigger>
      <Button
        label="Task Filters"
        variant="outlined"
        iconLeft={
          <SlidersHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />
      <Modal isDismissable className="w-[460px]">
        <Dialog className="max-h-[calc(100dvh-64px)]">
          <DialogHeader>
            <DialogHeading>Task Filters</DialogHeading>
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
