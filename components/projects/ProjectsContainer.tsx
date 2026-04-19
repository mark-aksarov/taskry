"use client";

import dynamic from "next/dynamic";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { GuestModeModal } from "../common/GuestModeModal";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { ProjectListItemSkeleton } from "./ProjectListItem";
import { ProjectCommentsModal } from "./ProjectCommentsModal";
import { UpdateProjectProvider } from "./UpdateProjectProvider";
import { DeleteProjectProvider } from "./DeleteProjectProvider";
import { ProjectGridItemMobileSkeleton } from "./ProjectGridItem";
import { ProjectDetailSideSheet } from "./ProjectDetailSideSheet";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailSideSheet } from "../users/UserDetailSideSheet";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { ModalManagerProvider } from "../common/ModalManagerContext";
import { CommentFormProvider } from "../comments/CommentFormContext";
import { SendCommentProvider } from "../comments/SendCommentProvider";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { UpdateProjectFormContainer } from "./UpdateProjectFormContainer";
import { UpdateCommentProvider } from "../comments/UpdateCommentProvider";
import { UpdateProjectStatusProvider } from "./UpdateProjectStatusProvider";
import { CustomerDetailSideSheet } from "../customer/CustomerDetailSideSheet";
import { CustomerDetailContainer } from "../customer/CustomerDetailContainer";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";
import { CustomerDetailHeaderContainer } from "../customer/CustomerDetailHeaderContainer";

const ProjectListItem = dynamic(
  () => import("./ProjectListItem").then((mod) => mod.ProjectListItem),
  {
    ssr: false,
    loading: () => <ProjectListItemSkeleton />,
  },
);

const ProjectGridItemLarge = dynamic(
  () => import("./ProjectGridItem").then((mod) => mod.ProjectGridItemLarge),
  {
    ssr: false,
  },
);

const ProjectGridItemMobile = dynamic(
  () => import("./ProjectGridItem").then((mod) => mod.ProjectGridItemMobile),
  {
    ssr: false,
    loading: () => <ProjectGridItemMobileSkeleton />,
  },
);

export interface ProjectsContainerProps {
  projects: ProjectListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function ProjectsContainer({
  projects,
  totalCount,
  page,
  pageSize,
}: ProjectsContainerProps) {
  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
    >
      {projects.map((project) => {
        const taskStatProps = {
          tasksTotal: project.tasks.total,
          tasksCompleted: project.tasks.completed,
        };

        return (
          <ModalManagerProvider key={project.id}>
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
                        {/* Dynamic */}
                        <ProjectListItem {...project} />
                        <ProjectGridItemMobile
                          {...project}
                          {...taskStatProps}
                        />
                        <ProjectGridItemLarge {...project} {...taskStatProps} />

                        {/* Modals and side sheets */}
                        <ProjectDetailSideSheet
                          projectId={project.id}
                          projectDetailContainer={
                            <ProjectDetailContainer projectId={project.id} />
                          }
                        />

                        {project.customer && (
                          <CustomerDetailSideSheet
                            customerId={project.customer.id}
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
                        )}

                        {project.creator && (
                          <UserDetailSideSheet
                            userId={project.creator.id}
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
                        )}

                        <ProjectCommentsModal
                          projectCommentsContainer={
                            <ProjectCommentsContainer projectId={project.id} />
                          }
                        />

                        <UpdateProjectModal
                          updateProjectFormContainer={
                            <UpdateProjectFormContainer
                              projectId={project.id}
                            />
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
      })}
    </EntityContainerPresentation>
  );
}
