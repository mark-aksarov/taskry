"use client";

import dynamic from "next/dynamic";
import { ProjectGrid } from "./ProjectGrid";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { ProjectListItemSkeleton } from "./ProjectListItem";
import { ProjectCommentsModal } from "./ProjectCommentsModal";
import { UpdateProjectProvider } from "./UpdateProjectContext";
import { DeleteProjectProvider } from "./DeleteProjectContext";
import { ProjectGridItemMobileSkeleton } from "./ProjectGridItem";
import { ProjectDetailSideSheet } from "./ProjectDetailSideSheet";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailSideSheet } from "../users/UserDetailSideSheet";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { CommentFormProvider } from "../comments/CommentFormContext";
import { SendCommentProvider } from "../comments/SendCommentContext";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { ClientDetailSideSheet } from "../client/ClientDetailSideSheet";
import { ClientDetailContainer } from "../client/ClientDetailContainer";
import { UpdateCommentProvider } from "../comments/UpdateCommentContext";
import { UpdateProjectFormContainer } from "./UpdateProjectFormContainer";
import { UpdateProjectStatusProvider } from "./UpdateProjectStatusContext";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";
import { ClientDetailHeaderContainer } from "../client/ClientDetailHeaderContainer";

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

export interface ProjectGridContainerProps {
  projects: ProjectListItemDTO[];
}

export function ProjectGridContainer({ projects }: ProjectGridContainerProps) {
  return (
    <ProjectGrid>
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

                        {project.client && (
                          <ClientDetailSideSheet
                            clientId={project.client.id}
                            clientDetailContainer={
                              <ClientDetailContainer
                                clientId={project.client.id}
                              />
                            }
                            clientDetailHeaderContainer={
                              <ClientDetailHeaderContainer
                                clientId={project.client.id}
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
          </ModalManagerProvider>
        );
      })}
    </ProjectGrid>
  );
}
