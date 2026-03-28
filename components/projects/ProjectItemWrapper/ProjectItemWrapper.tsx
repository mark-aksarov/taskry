import { DeleteProjectModal } from "../DeleteProjectModal";
import { UpdateProjectModal } from "../UpdateProjectModal";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { UpdateProjectProvider } from "../UpdateProjectProvider";
import { DeleteProjectProvider } from "../DeleteProjectProvider";
import { ProjectDetailContainer } from "../ProjectDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectCommentsContainer } from "../ProjectCommentsContainer";
import { UpdateProjectFormContainer } from "../UpdateProjectFormContainer";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusProvider";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { CustomerDetailModal } from "@/components/customer/CustomerDetailModal";
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
      <UpdateProjectProvider projectId={project.id}>
        <DeleteProjectProvider>
          <UpdateProjectStatusProvider>
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
                  <CustomerDetailContainer customerId={project.customer.id} />
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
                  <UserDetailHeaderContainer userId={project.creator.id} />
                }
              />
            )}

            <ProjectCommentsModal
              projectId={project.id}
              projectCommentsContainer={
                <ProjectCommentsContainer projectId={project.id} />
              }
              sendComment={sendComment}
              updateComment={updateComment}
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
          </UpdateProjectStatusProvider>
        </DeleteProjectProvider>
      </UpdateProjectProvider>
    </ModalManagerProvider>
  );
}
