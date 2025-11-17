import { ModalProps } from "@/components/ui";
import { CreateNewModal } from "@/components/common/CreateNewModal";

interface NewTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskForm: React.ReactNode;
}

export function NewTaskModal({ newTaskForm, ...props }: NewTaskModalProps) {
  return (
    <CreateNewModal
      title="New Task"
      submitButtonLabel="Create Task"
      form={newTaskForm}
      {...props}
    />
  );
}
