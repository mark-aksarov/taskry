import { DeleteProjectModal } from "../DeleteProjectModal";
import { UpdateProjectModal } from "../UpdateProjectModal";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { UpdateProjectProvider } from "../UpdateProjectProvider";
import { DeleteProjectProvider } from "../DeleteProjectProvider";
import { ProjectDetailContainer } from "../ProjectDetailContainer";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectCommentsContainer } from "../ProjectCommentsContainer";
import { UpdateProjectFormContainer } from "../UpdateProjectFormContainer";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusProvider";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { CustomerDetailModal } from "@/components/customer/CustomerDetailModal";
import { SendCommentProvider } from "@/components/comments/SendCommentProvider";
import { UpdateCommentProvider } from "@/components/comments/UpdateCommentProvider";
import { CustomerDetailContainer } from "@/components/customer/CustomerDetailContainer";
import { UserDetailHeaderContainer } from "@/components/users/UserDetailHeaderContainer";
import { CustomerDetailHeaderContainer } from "@/components/customer/CustomerDetailHeaderContainer";

interface ProjectItemWrapperProps {
  project: {
    id: number;
    title: string;
    customer?: {
      id: number;
      fullName: string;
    };
    creator?: {
      id: string;
      fullName: string;
    };
  };
  children: React.ReactNode;
}

export function ProjectItemWrapper({
  project,
  children,
}: ProjectItemWrapperProps) {
  return (
    <ModalManagerProvider>
      <UpdateProjectProvider>
        <DeleteProjectProvider>
          <UpdateProjectStatusProvider>
            <CommentFormProvider
              entityId={project.id}
              entityKey="projectId"
              mutateUrl={`/api/projects/${project.id}/comments`}
            >
              <SendCommentProvider>
                <UpdateCommentProvider>
                  {children}

                  <ProjectDetailModal
                    projectId={project.id}
                    projectDetailContainer={
                      <ProjectDetailContainer projectId={project.id} />
                    }
                  />

                  {project.customer && (
                    <CustomerDetailModal
                      customerId={project.customer.id}
                      customerDetailContainer={
                        <CustomerDetailContainer
                          customerId={project.customer.id}
                        />
                      }
                      customerDetailHeaderContainer={
                        <CustomerDetailHeaderContainer
                          customerId={project.customer.id}
                        />
                      }
                    />
                  )}

                  {project.creator && (
                    <UserDetailModal
                      userId={project.creator.id}
                      userDetailContainer={
                        <UserDetailContainer userId={project.creator.id} />
                      }
                      userDetailHeaderContainer={
                        <UserDetailHeaderContainer
                          userId={project.creator.id}
                        />
                      }
                    />
                  )}

                  <ProjectCommentsModal
                    projectCommentsContainer={
                      <ProjectCommentsContainer projectId={project.id} />
                    }
                  />

                  <UpdateProjectModal
                    updateProjectFormContainer={
                      <UpdateProjectFormContainer projectId={project.id} />
                    }
                  />

                  <DeleteProjectModal
                    projectId={project.id}
                    projectTitle={project.title}
                  />
                </UpdateCommentProvider>
              </SendCommentProvider>
            </CommentFormProvider>
          </UpdateProjectStatusProvider>
        </DeleteProjectProvider>
      </UpdateProjectProvider>

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
