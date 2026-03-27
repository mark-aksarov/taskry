import { DeleteProjectCategoryModalProvider } from "../DeleteProjectCategoryModal/DeleteProjectCategoryModalContext";
import { DeleteProjectCategoryProvider } from "../DeleteProjectCategoryProvider";
import { UpdateProjectCategoryModalProvider } from "../UpdateProjectCategoryModal";
import { UpdateProjectCategoryProvider } from "../UpdateProjectCategoryProvider";

interface ProjectItemProvidersProps {
  children: React.ReactNode;
}

export function ProjectCategoryProviders({
  children,
}: ProjectItemProvidersProps) {
  return (
    <UpdateProjectCategoryModalProvider>
      <UpdateProjectCategoryProvider>
        <DeleteProjectCategoryModalProvider>
          <DeleteProjectCategoryProvider>
            {children}
          </DeleteProjectCategoryProvider>
        </DeleteProjectCategoryModalProvider>
      </UpdateProjectCategoryProvider>
    </UpdateProjectCategoryModalProvider>
  );
}
