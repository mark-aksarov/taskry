import {
  BottomSheet,
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { OverlayTriggerState } from "react-stately";
import { useProjectDetailContainer } from "../ProjectDetail";

export interface ProjectDetailBottomSheetProps {
  projectId: number;
  state: OverlayTriggerState;
}

export function ProjectDetailBottomSheet({
  projectId,
  state,
}: ProjectDetailBottomSheetProps) {
  const ProjectDetailContainer = useProjectDetailContainer();

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog
        aria-label="App navigation"
        className="max-h-[calc(100dvh-6.25rem)]"
      >
        <DialogHeader>
          <DialogHeading className="text-base">Project Details</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <ProjectDetailContainer projectId={projectId} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Edit Project"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
