import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";

interface EditTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskForm: React.ReactNode;
}

export function EditTaskModal({ newTaskForm, ...props }: EditTaskModalProps) {
  return (
    <FormBaseModal
      title="Edit Task"
      submitButtonLabel="Update Task"
      form={newTaskForm}
      {...props}
    />
  );
}
