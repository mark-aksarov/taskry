import { DeleteTaskCategoryProvider } from "../DeleteTaskCategoryProvider";
import { UpdateTaskCategoryProvider } from "../UpdateTaskCategoryProvider";

interface TaskItemProvidersProps {
  children: React.ReactNode;
}

export function TaskCategoryProviders({ children }: TaskItemProvidersProps) {
  return (
    <UpdateTaskCategoryProvider>
      <DeleteTaskCategoryProvider>{children}</DeleteTaskCategoryProvider>
    </UpdateTaskCategoryProvider>
  );
}
