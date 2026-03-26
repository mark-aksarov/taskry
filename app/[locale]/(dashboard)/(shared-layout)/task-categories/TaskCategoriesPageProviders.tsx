import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryProvider";
import { CreateTaskCategoryModalProvider } from "@/components/taskCategory/CreateTaskCategoryModal";
import { DeleteTaskCategoriesProvider } from "@/components/taskCategory/DeleteTaskCategoriesProvider";

interface TaskCategoriesPageProvidersProps {
  pageItems: SelectedItem[];
  children: React.ReactNode;
}

export function TaskCategoriesPageProviders({
  pageItems,
  children,
}: TaskCategoriesPageProvidersProps) {
  return (
    <SelectedItemsProvider pageItems={pageItems}>
      <DeleteTaskCategoriesProvider>
        <CreateTaskCategoryModalProvider>
          <CreateTaskCategoryProvider>{children}</CreateTaskCategoryProvider>
        </CreateTaskCategoryModalProvider>
      </DeleteTaskCategoriesProvider>
    </SelectedItemsProvider>
  );
}
