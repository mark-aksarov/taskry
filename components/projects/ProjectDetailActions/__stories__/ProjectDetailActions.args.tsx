import { mockedProjectDetail } from "@/mocks/projects";
import { EditProjectForm } from "../../EditProjectForm";
import { editProjectFormArgs } from "../../EditProjectForm/__stories__";
import { getCommentList } from "@/components/comments/CommentList/__stories__";

const project = mockedProjectDetail;

export const projectDetailActionsArgs = {
  projectId: project.id,
  projectTitle: project.title,
  sendComment: () => ({ status: "success" as const }),
  updateComment: () => ({ status: "success" as const }),
  deleteProject: () => ({ status: "success" as const }),
  projectCommentsContainer: getCommentList(),
  editProjectFormContainer: <EditProjectForm {...editProjectFormArgs} />,
};
