import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";

interface EditTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editTaskForm: React.ReactNode;
}

export function EditTaskModal({ editTaskForm, ...props }: EditTaskModalProps) {
  return (
    <FormBaseModal
      title="Edit Task"
      submitButtonLabel="Update Task"
      form={editTaskForm}
      {...props}
    />
  );
}
