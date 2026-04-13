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
import { UpdateUserImageModal } from "@/components/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/components/users/DeleteUserImageModal";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { CustomerDetailModal } from "@/components/customer/CustomerDetailModal";
import { SendCommentProvider } from "@/components/comments/SendCommentProvider";
import { UpdateCommentProvider } from "@/components/comments/UpdateCommentProvider";
import { UpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider";
import { CustomerDetailContainer } from "@/components/customer/CustomerDetailContainer";
import { UserDetailHeaderContainer } from "@/components/users/UserDetailHeaderContainer";
import { ClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider";
import { UpdateCustomerImageModal } from "@/components/customer/UpdateCustomerImageModal";
import { DeleteCustomerImageModal } from "@/components/customer/DeleteCustomerImageModal";
import { UpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext";
import { UpdateCustomerImageProvider } from "@/components/customer/UpdateCustomerImageProvider";
import { CustomerDetailHeaderContainer } from "@/components/customer/CustomerDetailHeaderContainer";
import { ClearCustomerImageUrlProvider } from "@/components/customer/ClearCustomerImageUrlProvider";
import { UpdateCustomerImageFileProvider } from "@/components/customer/UpdateCustomerImageFileContext";

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
                    projectDetailContainer={
                      <ProjectDetailContainer projectId={project.id} />
                    }
                  />

                  {project.customer && (
                    <UpdateCustomerImageFileProvider>
                      <UpdateCustomerImageProvider>
                        <ClearCustomerImageUrlProvider
                          customerId={project.customer.id}
                        >
                          <CustomerDetailModal
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

                          <UpdateCustomerImageModal
                            customerId={project.customer.id}
                          />

                          <DeleteCustomerImageModal
                            customerId={project.customer.id}
                            customerFullName={project.customer.fullName}
                          />
                        </ClearCustomerImageUrlProvider>
                      </UpdateCustomerImageProvider>
                    </UpdateCustomerImageFileProvider>
                  )}

                  {project.creator && (
                    <UpdateUserImageFileProvider>
                      <UpdateUserImageProvider>
                        <ClearUserImageUrlProvider userId={project.creator.id}>
                          <UserDetailModal
                            userDetailContainer={
                              <UserDetailContainer
                                userId={project.creator.id}
                              />
                            }
                            userDetailHeaderContainer={
                              <UserDetailHeaderContainer
                                userId={project.creator.id}
                              />
                            }
                          />

                          <UpdateUserImageModal userId={project.creator.id} />

                          <DeleteUserImageModal
                            userId={project.creator.id}
                            userFullName={project.creator.fullName}
                          />
                        </ClearUserImageUrlProvider>
                      </UpdateUserImageProvider>
                    </UpdateUserImageFileProvider>
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
