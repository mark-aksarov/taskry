import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";

interface NewTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskForm: React.ReactNode;
}

export function NewTaskModal({ newTaskForm, ...props }: NewTaskModalProps) {
  return (
    <FormBaseModal
      title="New Task"
      submitButtonLabel="Create Task"
      form={newTaskForm}
      {...props}
    />
  );
}
