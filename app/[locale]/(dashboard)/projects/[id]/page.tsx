import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { getProjectFormData } from "@/lib/data/project/project.dal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { DeleteProjectProvider } from "@/dashboard/projects/DeleteProjectProvider";
import { UpdateProjectTitleModal } from "@/dashboard/projects/UpdateProjectTitleModal";
import { DeleteProjectDetailModal } from "@/dashboard/projects/DeleteProjectDetailModal";
import { UpdateProjectStatusModal } from "@/dashboard/projects/UpdateProjectStatusModal";
import { ProjectDetailAltContainer } from "@/dashboard/projects/ProjectDetailAltContainer";
import { UpdateProjectCustomerModal } from "@/dashboard/projects/UpdateProjectCustomerModal";
import { UpdateProjectTitleProvider } from "@/dashboard/projects/UpdateProjectTitleProvider";
import { UpdateProjectDeadlineModal } from "@/dashboard/projects/UpdateProjectDeadlineModal";
import { UpdateProjectStatusProvider } from "@/dashboard/projects/UpdateProjectStatusProvider";
import { UpdateProjectCustomerProvider } from "@/dashboard/projects/UpdateProjectCustomerProvider";
import { UpdateProjectDescriptionModal } from "@/dashboard/projects/UpdateProjectDescriptionModal";
import { UpdateProjectCategoryRelModal } from "@/dashboard/projects/UpdateProjectCategoryRelModal";
import { UpdateProjectDeadlineProvider } from "@/dashboard/projects/UpdateProjectDeadlineProvider";
import { UpdateProjectStatusAltProvider } from "@/dashboard/projects/UpdateProjectStatusAltProvider";
import { UpdateProjectDescriptionProvider } from "@/dashboard/projects/UpdateProjectDescriptionProvider";
import { UpdateProjectCategoryRelProvider } from "@/dashboard/projects/UpdateProjectCategoryRelProvider";
import { ProjectDetailCardHeaderContainer } from "@/dashboard/projects/ProjectDetailCardHeaderContainer";
import { UpdateProjectCustomerFormContainer } from "@/dashboard/projects/UpdateProjectCustomerFormContainer";
import { UpdateProjectCategoryRelFormContainer } from "@/dashboard/projects/UpdateProjectCategoryRelFormContainer";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPageSession();

  // Validation
  const { id: rawProjectId } = await params;

  const parsed = projectId.safeParse(rawProjectId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get project
  const projectFormData = await getProjectFormData(id);

  if (!projectFormData) {
    notFound();
  }

  return (
    <DeleteProjectProvider>
      <UpdateProjectStatusProvider>
        <UpdateProjectDescriptionProvider>
          <UpdateProjectTitleProvider>
            <UpdateProjectStatusAltProvider>
              <UpdateProjectCategoryRelProvider>
                <UpdateProjectDeadlineProvider>
                  <UpdateProjectCustomerProvider>
                    <ProjectDetailPage
                      projectDetailCardHeaderContainer={
                        <ProjectDetailCardHeaderContainer projectId={id} />
                      }
                      projectDetailContainer={
                        <ProjectDetailAltContainer projectId={id} />
                      }
                    />

                    <DeleteProjectDetailModal
                      projectId={projectFormData.id}
                      projectTitle={projectFormData.title}
                    />

                    <UpdateProjectDescriptionModal
                      projectId={projectFormData.id}
                      description={projectFormData.description}
                    />

                    <UpdateProjectTitleModal
                      projectId={projectFormData.id}
                      title={projectFormData.title}
                    />

                    <UpdateProjectDeadlineModal
                      projectId={projectFormData.id}
                      projectDeadline={projectFormData.deadline}
                    />

                    <UpdateProjectCategoryRelModal
                      updateProjectCategoryRelFormContainer={
                        <UpdateProjectCategoryRelFormContainer
                          projectId={projectFormData.id}
                          categoryId={projectFormData.categoryId}
                        />
                      }
                    />

                    <UpdateProjectCustomerModal
                      updateProjectCustomerFormContainer={
                        <UpdateProjectCustomerFormContainer
                          projectId={projectFormData.id}
                          customerId={projectFormData.customerId}
                        />
                      }
                    />

                    <UpdateProjectStatusModal
                      projectId={projectFormData.id}
                      projectStatus={projectFormData.status}
                    />

                    <TaskSearchModal
                      searchContainer={
                        <LinkSearchContainer pathname="/tasks" />
                      }
                    />
                  </UpdateProjectCustomerProvider>
                </UpdateProjectDeadlineProvider>
              </UpdateProjectCategoryRelProvider>
            </UpdateProjectStatusAltProvider>
          </UpdateProjectTitleProvider>
        </UpdateProjectDescriptionProvider>
      </UpdateProjectStatusProvider>
    </DeleteProjectProvider>
  );
}
