import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";

interface NewProjectModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newProjectForm: React.ReactNode;
}

export function NewProjectModal({
  newProjectForm,
  ...props
}: NewProjectModalProps) {
  return (
    <FormBaseModal
      title="New Project"
      submitButtonLabel="Create Project"
      form={newProjectForm}
      {...props}
    />
  );
}
