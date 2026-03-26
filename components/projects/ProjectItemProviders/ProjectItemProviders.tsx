import { UpdateProjectProvider } from "../UpdateProjectProvider";
import { DeleteProjectProvider } from "../DeleteProjectProvider";
import { UpdateProjectModalProvider } from "../UpdateProjectModal";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusProvider";
import { ProjectDetailModalProvider } from "../ProjectDetailModal";
import { UserDetailModalProvider } from "@/components/users/UserDetailModal";
import { CustomerDetailModalProvider } from "@/components/customer/CustomerDetailModal";
import { ProjectCommentsModalProvider } from "../ProjectCommentsModal";
import { DeleteProjectModalProvider } from "../DeleteProjectModal";

interface ProjectItemProvidersProps {
  children: React.ReactNode;
}

export function ProjectItemProviders({ children }: ProjectItemProvidersProps) {
  return (
    <ProjectDetailModalProvider>
      <UserDetailModalProvider>
        <CustomerDetailModalProvider>
          <ProjectCommentsModalProvider>
            <UpdateProjectModalProvider>
              <UpdateProjectProvider>
                <DeleteProjectModalProvider>
                  <DeleteProjectProvider>
                    <UpdateProjectStatusProvider>
                      {children}
                    </UpdateProjectStatusProvider>
                  </DeleteProjectProvider>
                </DeleteProjectModalProvider>
              </UpdateProjectProvider>
            </UpdateProjectModalProvider>
          </ProjectCommentsModalProvider>
        </CustomerDetailModalProvider>
      </UserDetailModalProvider>
    </ProjectDetailModalProvider>
  );
}
