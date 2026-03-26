import { UpdateProjectProvider } from "../UpdateProjectProvider";
import { DeleteProjectProvider } from "../DeleteProjectProvider";
import { UpdateProjectModalProvider } from "../UpdateProjectModal";
import { DeleteProjectModalProvider } from "../DeleteProjectModal";
import { ProjectCommentsModalProvider } from "../ProjectCommentsModal";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusProvider";

interface ProjectDetailProvidersProps {
  children: React.ReactNode;
}

export function ProjectDetailProviders({
  children,
}: ProjectDetailProvidersProps) {
  return (
    <UpdateProjectModalProvider>
      <UpdateProjectProvider>
        <DeleteProjectModalProvider>
          <DeleteProjectProvider>
            <UpdateProjectStatusProvider>
              <ProjectCommentsModalProvider>
                {children}
              </ProjectCommentsModalProvider>
            </UpdateProjectStatusProvider>
          </DeleteProjectProvider>
        </DeleteProjectModalProvider>
      </UpdateProjectProvider>
    </UpdateProjectModalProvider>
  );
}
