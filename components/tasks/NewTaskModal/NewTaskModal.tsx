import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  ModalProps,
} from "@/components/ui";

interface NewTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskForm: React.ReactNode;
}

export function NewTaskModal({ newTaskForm, ...props }: NewTaskModalProps) {
  return (
    <ResponsiveModal isDismissable className="w-[460px]" {...props}>
      <Dialog className="md:max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>New Task</DialogHeading>
          <DialogCloseButton iconSize={20} />
        </DialogHeader>
        <DialogBody>{newTaskForm}</DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Create Task"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </ResponsiveModal>
  );
}
