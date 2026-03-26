import { DeleteSubtaskProvider } from "../DeleteSubtaskProvider";
import { UpdateSubtaskProvider } from "../UpdateSubtaskProvider";
import { ToggleSubtaskProvider } from "../ToggleSubtaskProvider";
import { UpdateSubtaskModalProvider } from "../UpdateSubtaskModal";

interface SubtaskProvidersProps {
  taskId: number;
  children: React.ReactNode;
}

export function SubtaskProviders({ taskId, children }: SubtaskProvidersProps) {
  return (
    <DeleteSubtaskProvider taskId={taskId}>
      <UpdateSubtaskModalProvider>
        <UpdateSubtaskProvider taskId={taskId}>
          <ToggleSubtaskProvider taskId={taskId}>
            {children}
          </ToggleSubtaskProvider>
        </UpdateSubtaskProvider>
      </UpdateSubtaskModalProvider>
    </DeleteSubtaskProvider>
  );
}
