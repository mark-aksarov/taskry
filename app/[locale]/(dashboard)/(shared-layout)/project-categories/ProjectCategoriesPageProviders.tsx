import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider";
import { CreateProjectCategoryModalProvider } from "@/components/projectCategory/CreateProjectCategoryModal";
import { DeleteProjectCategoriesProvider } from "@/components/projectCategory/DeleteProjectCategoriesProvider";

interface ProjectCategoriesPageProvidersProps {
  pageItems: SelectedItem[];
  children: React.ReactNode;
}

export function ProjectCategoriesPageProviders({
  pageItems,
  children,
}: ProjectCategoriesPageProvidersProps) {
  return (
    <SelectedItemsProvider pageItems={pageItems}>
      <DeleteProjectCategoriesProvider>
        <CreateProjectCategoryModalProvider>
          <CreateProjectCategoryProvider>
            {children}
          </CreateProjectCategoryProvider>
        </CreateProjectCategoryModalProvider>
      </DeleteProjectCategoriesProvider>
    </SelectedItemsProvider>
  );
}
