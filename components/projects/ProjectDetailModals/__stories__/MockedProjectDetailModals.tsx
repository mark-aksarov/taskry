import { mockedProjectDetail } from "@/mocks/projects";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { UpdateProjectForm } from "../../UpdateProjectForm";
import { UpdateProjectModal } from "../../UpdateProjectModal";
import { CommentList } from "@/components/comments/CommentList";
import { ProjectCommentsModal } from "../../ProjectCommentsModal";
import { DeleteProjectDetailModal } from "../../DeleteProjectModal";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";

export function MockedProjectDetailModals() {
  return (
    <>
      <UpdateProjectModal
        updateProjectFormContainer={
          <UpdateProjectForm
            {...mockedProjectDetail}
            projectId={mockedProjectDetail.id}
            projectCategorySelectItems={mockedProjectCategorySummaries}
            customerSelectItems={mockedCustomerSummaries}
          />
        }
      />

      <DeleteProjectDetailModal
        projectId={mockedProjectDetail.id}
        projectTitle={mockedProjectDetail.title}
      />

      <ProjectCommentsModal
        projectId={mockedProjectDetail.id}
        projectCommentsContainer={<CommentList {...CommentListStory.args} />}
        sendComment={() => ({ status: "success" })}
        updateComment={() => ({ status: "success" })}
      />
    </>
  );
}
