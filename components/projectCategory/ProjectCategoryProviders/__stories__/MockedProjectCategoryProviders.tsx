import { UpdateProjectCategoryModalProvider } from "../../UpdateProjectCategoryModal";
import { MockedUpdateProjectCategoryProvider } from "../../UpdateProjectCategoryProvider/__stories__";
import { MockedDeleteProjectCategoryProvider } from "../../DeleteProjectCategoryProvider/__stories__";

export function MockedProjectCategoryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateProjectCategoryModalProvider>
      <MockedUpdateProjectCategoryProvider>
        <MockedDeleteProjectCategoryProvider>
          {children}
        </MockedDeleteProjectCategoryProvider>
      </MockedUpdateProjectCategoryProvider>
    </UpdateProjectCategoryModalProvider>
  );
}
