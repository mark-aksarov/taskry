import { MockedDeleteProjectProvider } from "../../DeleteProjectProvider/__stories__";
import { MockedUpdateProjectProvider } from "../../UpdateProjectProvider/__stories__";
import { MockedUpdateProjectStatusProvider } from "../../UpdateProjectStatusProvider/__stories__";

export function MockedProjectItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MockedDeleteProjectProvider>
      <MockedUpdateProjectProvider>
        <MockedUpdateProjectStatusProvider>
          {children}
        </MockedUpdateProjectStatusProvider>
      </MockedUpdateProjectProvider>
    </MockedDeleteProjectProvider>
  );
}
