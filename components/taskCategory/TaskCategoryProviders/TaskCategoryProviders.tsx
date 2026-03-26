import { DeleteTaskCategoryProvider } from "../DeleteTaskCategoryProvider";
import { UpdateTaskCategoryModalProvider } from "../UpdateTaskCategoryModal";
import { UpdateTaskCategoryProvider } from "../UpdateTaskCategoryProvider";

interface TaskItemProvidersProps {
  children: React.ReactNode;
}

export function TaskCategoryProviders({ children }: TaskItemProvidersProps) {
  return (
    <UpdateTaskCategoryModalProvider>
      <UpdateTaskCategoryProvider>
        <DeleteTaskCategoryProvider>{children}</DeleteTaskCategoryProvider>
      </UpdateTaskCategoryProvider>
    </UpdateTaskCategoryModalProvider>
  );
}
