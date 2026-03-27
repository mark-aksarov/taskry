import { UpdateProjectCategoryModalProvider } from "../../UpdateProjectCategoryModal";
import { MockedUpdateProjectCategoryProvider } from "../../UpdateProjectCategoryProvider/__stories__";
import { MockedDeleteProjectCategoryProvider } from "../../DeleteProjectCategoryProvider/__stories__";
import { DeleteProjectCategoryModalProvider } from "../../DeleteProjectCategoryModal/DeleteProjectCategoryModalContext";

export function MockedProjectCategoryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateProjectCategoryModalProvider>
      <MockedUpdateProjectCategoryProvider>
        <DeleteProjectCategoryModalProvider>
          <MockedDeleteProjectCategoryProvider>
            {children}
          </MockedDeleteProjectCategoryProvider>
        </DeleteProjectCategoryModalProvider>
      </MockedUpdateProjectCategoryProvider>
    </UpdateProjectCategoryModalProvider>
  );
}
