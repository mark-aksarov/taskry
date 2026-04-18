import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { getProjectFormData } from "@/lib/data/project/project.dal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { DeleteProjectProvider } from "@/components/projects/DeleteProjectProvider";
import { UpdateProjectTitleModal } from "@/components/projects/UpdateProjectTitleModal";
import { DeleteProjectDetailModal } from "@/components/projects/DeleteProjectDetailModal";
import { UpdateProjectStatusModal } from "@/components/projects/UpdateProjectStatusModal";
import { ProjectDetailAltContainer } from "@/components/projects/ProjectDetailAltContainer";
import { UpdateProjectCustomerModal } from "@/components/projects/UpdateProjectCustomerModal";
import { UpdateProjectTitleProvider } from "@/components/projects/UpdateProjectTitleProvider";
import { UpdateProjectDeadlineModal } from "@/components/projects/UpdateProjectDeadlineModal";
import { UpdateProjectStatusProvider } from "@/components/projects/UpdateProjectStatusProvider";
import { UpdateProjectCustomerProvider } from "@/components/projects/UpdateProjectCustomerProvider";
import { UpdateProjectDescriptionModal } from "@/components/projects/UpdateProjectDescriptionModal";
import { UpdateProjectCategoryRelModal } from "@/components/projects/UpdateProjectCategoryRelModal";
import { UpdateProjectDeadlineProvider } from "@/components/projects/UpdateProjectDeadlineProvider";
import { UpdateProjectStatusAltProvider } from "@/components/projects/UpdateProjectStatusAltProvider";
import { UpdateProjectDescriptionProvider } from "@/components/projects/UpdateProjectDescriptionProvider";
import { UpdateProjectCategoryRelProvider } from "@/components/projects/UpdateProjectCategoryRelProvider";
import { ProjectDetailCardHeaderContainer } from "@/components/projects/ProjectDetailCardHeaderContainer";
import { UpdateProjectCustomerFormContainer } from "@/components/projects/UpdateProjectCustomerFormContainer";
import { UpdateProjectCategoryRelFormContainer } from "@/components/projects/UpdateProjectCategoryRelFormContainer";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

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
