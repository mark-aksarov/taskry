import { DeleteProjectModal } from "../DeleteProjectModal";
import { UpdateProjectModal } from "../UpdateProjectModal";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { ProjectDetailContainer } from "../ProjectDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectCommentsContainer } from "../ProjectCommentsContainer";
import { UpdateProjectFormContainer } from "../UpdateProjectFormContainer";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { CustomerDetailModal } from "@/components/customer/CustomerDetailModal";
import { UserDetailHeaderContainer } from "@/components/users/UserDetailHeaderContainer";
import { CustomerDetailHeaderContainer } from "@/components/customer/CustomerDetailHeaderContainer";
import { CustomerDetailContainer } from "@/components/customer/CustomerDetailContainer";

interface ProjectItemModalsProps {
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
}

export function ProjectItemModals({ project }: ProjectItemModalsProps) {
  return (
    <>
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
            <CustomerDetailHeaderContainer customerId={project.customer.id} />
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

      <DeleteProjectModal projectId={project.id} projectTitle={project.title} />
    </>
  );
}
