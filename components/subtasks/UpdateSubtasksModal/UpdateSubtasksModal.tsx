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
import { useUpdateSubtasksFormContainer } from "../UpdateSubtasksForm/UpdateSubtasksFormContainerContext";

export function UpdateSubtasksModal({ taskId }: { taskId: number }) {
  const UpdateSubtasksFormContainer = useUpdateSubtasksFormContainer();

  return (
    <ResponsiveModal isDismissable className="w-[460px]">
      <Dialog className="md:max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>Subtasks</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody className="flex flex-col p-3">
          <UpdateSubtasksFormContainer taskId={taskId} />
        </DialogBody>
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
