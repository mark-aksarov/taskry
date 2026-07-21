import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { getProject } from "@/lib/data/project/project.dal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { DeleteProjectProvider } from "@/dashboard/projects/DeleteProjectProvider";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
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
  const project = await getProject(id);

  if (!project) {
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
                      projectId={project.id}
                      projectTitle={project.title}
                    />

                    <UpdateProjectDescriptionModal
                      projectId={project.id}
                      description={project.description}
                    />

                    <UpdateProjectTitleModal
                      projectId={project.id}
                      title={project.title}
                    />

                    <UpdateProjectDeadlineModal
                      projectId={project.id}
                      projectDeadline={project.deadline}
                    />

                    <UpdateProjectCategoryRelModal
                      updateProjectCategoryRelFormContainer={
                        <UpdateProjectCategoryRelFormContainer
                          projectId={project.id}
                          categoryId={project.categoryId}
                        />
                      }
                    />

                    <UpdateProjectCustomerModal
                      updateProjectCustomerFormContainer={
                        <UpdateProjectCustomerFormContainer
                          projectId={project.id}
                          customerId={project.customerId}
                        />
                      }
                    />

                    <UpdateProjectStatusModal
                      projectId={project.id}
                      projectStatus={project.status}
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
