import { CreateSubtaskModalProvider } from "@/components/subtasks/CreateSubtaskModal";
import { CreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider";

interface TaskDetailProvidersProps {
  taskId: number;
  children: React.ReactNode;
}

export function TaskDetailProviders({
  taskId,
  children,
}: TaskDetailProvidersProps) {
  return (
    <CreateSubtaskModalProvider>
      <CreateSubtaskProvider taskId={taskId}>{children}</CreateSubtaskProvider>
    </CreateSubtaskModalProvider>
  );
}
