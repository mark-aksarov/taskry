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

export function UpdateSubtasksModal({
  updateSubtasksForm,
}: {
  updateSubtasksForm: React.ReactNode;
}) {
  return (
    <ResponsiveModal isDismissable className="w-[460px]">
      <Dialog className="md:max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>Subtasks</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody className="p-3">{updateSubtasksForm}</DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Update Subtasks"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </ResponsiveModal>
  );
}
