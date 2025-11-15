import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";

export function NewProjectModal({
  newProjectForm,
}: {
  newProjectForm: React.ReactNode;
}) {
  return (
    <ResponsiveModal isDismissable className="w-[460px]">
      <Dialog className="md:max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>New Project</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody>{newProjectForm}</DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Create Project"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </ResponsiveModal>
  );
}
