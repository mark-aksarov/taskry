import { ModalProps } from "@/components/ui";
import { CreateNewModal } from "@/components/common/CreateNewModal";

interface NewProjectModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newProjectForm: React.ReactNode;
}

export function NewProjectModal({
  newProjectForm,
  ...props
}: NewProjectModalProps) {
  return (
    <CreateNewModal
      title="New Project"
      submitButtonLabel="Create Project"
      form={newProjectForm}
      {...props}
    />
  );
}
