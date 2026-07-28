import { useTranslations } from "next-intl";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { ProjectDTO } from "@/lib/data/project/project.dto";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ProjectDetailCard } from "@/dashboard/projects/ProjectDetailCard";
import { DeleteProjectProvider } from "@/dashboard/projects/DeleteProjectContext";
import { UpdateProjectTitleModal } from "@/dashboard/projects/UpdateProjectTitleModal";
import { UpdateProjectClientModal } from "@/dashboard/projects/UpdateProjectClientModal";
import { UpdateProjectStatusModal } from "@/dashboard/projects/UpdateProjectStatusModal";
import { DeleteProjectDetailModal } from "@/dashboard/projects/DeleteProjectDetailModal";
import { DeleteProjectModalTrigger } from "@/dashboard/projects/DeleteProjectModalTrigger";
import { UpdateProjectTitleProvider } from "@/dashboard/projects/UpdateProjectTitleContext";
import { UpdateProjectDeadlineModal } from "@/dashboard/projects/UpdateProjectDeadlineModal";
import { UpdateProjectStatusProvider } from "@/dashboard/projects/UpdateProjectStatusContext";
import { UpdateProjectClientProvider } from "@/dashboard/projects/UpdateProjectClientContext";
import { UpdateProjectDeadlineProvider } from "@/dashboard/projects/UpdateProjectDeadlineContext";
import { UpdateProjectDescriptionModal } from "@/dashboard/projects/UpdateProjectDescriptionModal";
import { UpdateProjectCategoryRelModal } from "@/dashboard/projects/UpdateProjectCategoryRelModal";
import { UpdateProjectStatusAltProvider } from "@/dashboard/projects/UpdateProjectStatusAltContext";
import { UpdateProjectDescriptionProvider } from "@/dashboard/projects/UpdateProjectDescriptionContext";
import { UpdateProjectCategoryRelProvider } from "@/dashboard/projects/UpdateProjectCategoryRelContext";

interface ProjectPageProps {
  project: ProjectDTO;
  projectDetailCardHeaderContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  updateProjectCategoryRelFormContainer: React.ReactNode;
  updateProjectClientFormContainer: React.ReactNode;
  searchContainer: React.ReactNode;
}

export function ProjectDetailPage({
  project,
  projectDetailCardHeaderContainer,
  projectDetailContainer,
  updateProjectCategoryRelFormContainer,
  updateProjectClientFormContainer,
  searchContainer,
}: ProjectPageProps) {
  const t = useTranslations("app.ProjectDetailPage");

  return (
    <DeleteProjectProvider>
      <UpdateProjectStatusProvider>
        <UpdateProjectDescriptionProvider>
          <UpdateProjectTitleProvider>
            <UpdateProjectStatusAltProvider>
              <UpdateProjectCategoryRelProvider>
                <UpdateProjectDeadlineProvider>
                  <UpdateProjectClientProvider>
                    <DashboardContainer>
                      <DashboardGrid>
                        <ToolbarMobile
                          firstSlot={
                            <>
                              <BackButton fallbackHref="/projects" />
                              <PageHeadingMobile>
                                {t("heading")}
                              </PageHeadingMobile>
                            </>
                          }
                          secondSlot={
                            <DeleteProjectModalTrigger buttonVariant="secondary" />
                          }
                        />

                        <ProjectDetailCard
                          projectDetailCardHeaderContainer={
                            projectDetailCardHeaderContainer
                          }
                          projectDetailContainer={projectDetailContainer}
                        />
                      </DashboardGrid>
                    </DashboardContainer>

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
                        updateProjectCategoryRelFormContainer
                      }
                    />

                    <UpdateProjectClientModal
                      updateProjectClientFormContainer={
                        updateProjectClientFormContainer
                      }
                    />

                    <UpdateProjectStatusModal
                      projectId={project.id}
                      projectStatus={project.status}
                    />

                    <TaskSearchModal searchContainer={searchContainer} />
                  </UpdateProjectClientProvider>
                </UpdateProjectDeadlineProvider>
              </UpdateProjectCategoryRelProvider>
            </UpdateProjectStatusAltProvider>
          </UpdateProjectTitleProvider>
        </UpdateProjectDescriptionProvider>
      </UpdateProjectStatusProvider>
    </DeleteProjectProvider>
  );
}
