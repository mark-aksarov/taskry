import { Suspense } from "react";
import { SideSheet } from "../ui/SideSheet";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontal } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import { ProjectFilters, ProjectFiltersSkeleton } from "./ProjectFilters";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui/Dialog";

export function ProjectFiltersSideSheetTrigger() {
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
            <Suspense fallback={<ProjectFiltersSkeleton />}>
              <ProjectFilters />
            </Suspense>
          </DialogBody>
        </Dialog>
      </SideSheet>
    </DialogTrigger>
  );
}
