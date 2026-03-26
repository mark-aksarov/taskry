import { UpdateProjectModalProvider } from "../../UpdateProjectModal";
import { DeleteProjectModalProvider } from "../../DeleteProjectModal";
import { MockedUpdateProjectProvider } from "../../UpdateProjectProvider/__stories__";
import { MockedDeleteProjectProvider } from "../../DeleteProjectProvider/__stories__";
import { MockedUpdateProjectStatusProvider } from "../../UpdateProjectStatusProvider/__stories__";
import { ProjectCommentsModalProvider } from "../../ProjectCommentsModal";

export function MockedProjectDetailProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateProjectModalProvider>
      <MockedUpdateProjectProvider>
        <DeleteProjectModalProvider>
          <MockedDeleteProjectProvider>
            <MockedUpdateProjectStatusProvider>
              <ProjectCommentsModalProvider>
                {children}
              </ProjectCommentsModalProvider>
            </MockedUpdateProjectStatusProvider>
          </MockedDeleteProjectProvider>
        </DeleteProjectModalProvider>
      </MockedUpdateProjectProvider>
    </UpdateProjectModalProvider>
  );
}
