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
        <DeleteProjectCategoryProvider>
          {children}
        </DeleteProjectCategoryProvider>
      </UpdateProjectCategoryProvider>
    </UpdateProjectCategoryModalProvider>
  );
}
