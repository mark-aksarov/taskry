import { UpdateProjectModalProvider } from "../../UpdateProjectModal";
import { ProjectDetailModalProvider } from "../../ProjectDetailModal";
import { DeleteProjectModalProvider } from "../../DeleteProjectModal";
import { ProjectCommentsModalProvider } from "../../ProjectCommentsModal";
import { UserDetailModalProvider } from "@/components/users/UserDetailModal";
import { MockedUpdateProjectProvider } from "../../UpdateProjectProvider/__stories__";
import { MockedDeleteProjectProvider } from "../../DeleteProjectProvider/__stories__";
import { CustomerDetailModalProvider } from "@/components/customer/CustomerDetailModal";
import { MockedUpdateProjectStatusProvider } from "../../UpdateProjectStatusProvider/__stories__";

export function MockedProjectItemProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectDetailModalProvider>
      <UserDetailModalProvider>
        <CustomerDetailModalProvider>
          <ProjectCommentsModalProvider>
            <UpdateProjectModalProvider>
              <MockedUpdateProjectProvider>
                <DeleteProjectModalProvider>
                  <MockedDeleteProjectProvider>
                    <MockedUpdateProjectStatusProvider>
                      {children}
                    </MockedUpdateProjectStatusProvider>
                  </MockedDeleteProjectProvider>
                </DeleteProjectModalProvider>
              </MockedUpdateProjectProvider>
            </UpdateProjectModalProvider>
          </ProjectCommentsModalProvider>
        </CustomerDetailModalProvider>
      </UserDetailModalProvider>
    </ProjectDetailModalProvider>
  );
}
