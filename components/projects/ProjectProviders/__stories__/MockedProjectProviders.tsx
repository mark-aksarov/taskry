import { UpdateProjectModalProvider } from "../../UpdateProjectModal";
import { MockedUpdateProjectProvider } from "../../UpdateProjectProvider/__stories__";
import { MockedDeleteProjectProvider } from "../../DeleteProjectProvider/__stories__";
import { MockedUpdateProjectStatusProvider } from "../../UpdateProjectStatusProvider/__stories__";

export function MockedProjectProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateProjectModalProvider>
      <MockedUpdateProjectProvider>
        <MockedDeleteProjectProvider>
          <MockedUpdateProjectStatusProvider>
            {children}
          </MockedUpdateProjectStatusProvider>
        </MockedDeleteProjectProvider>
      </MockedUpdateProjectProvider>
    </UpdateProjectModalProvider>
  );
}
