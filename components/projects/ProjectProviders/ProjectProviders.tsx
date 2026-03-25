import { UpdateProjectProvider } from "../UpdateProjectProvider";
import { DeleteProjectProvider } from "../DeleteProjectProvider";
import { UpdateProjectModalProvider } from "../UpdateProjectModal";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusProvider";

interface ProjectItemProvidersProps {
  children: React.ReactNode;
}

export function ProjectProviders({ children }: ProjectItemProvidersProps) {
  return (
    <UpdateProjectModalProvider>
      <UpdateProjectProvider>
        <DeleteProjectProvider>
          <UpdateProjectStatusProvider>{children}</UpdateProjectStatusProvider>
        </DeleteProjectProvider>
      </UpdateProjectProvider>
    </UpdateProjectModalProvider>
  );
}
