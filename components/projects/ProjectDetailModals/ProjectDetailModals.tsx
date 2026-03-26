import { UpdateProjectModal } from "../UpdateProjectModal";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { DeleteProjectDetailModal } from "../DeleteProjectModal";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { ProjectCommentsContainer } from "../ProjectCommentsContainer";
import { UpdateProjectFormContainer } from "../UpdateProjectFormContainer";

interface ProjectDetailModalsProps {
  project: {
    id: number;
    title: string;
  };
}

export function ProjectDetailModals({ project }: ProjectDetailModalsProps) {
  return (
    <>
      <UpdateProjectModal
        updateProjectFormContainer={
          <UpdateProjectFormContainer projectId={project.id} />
        }
      />

      <DeleteProjectDetailModal
        projectId={project.id}
        projectTitle={project.title}
      />

      <ProjectCommentsModal
        projectId={project.id}
        sendComment={sendComment}
        updateComment={updateComment}
        projectCommentsContainer={
          <ProjectCommentsContainer projectId={project.id} />
        }
      />
    </>
  );
}
