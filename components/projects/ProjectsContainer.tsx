import { Suspense } from "react";
import { Repeat } from "../common/Repeat";
import { ProjectList } from "./ProjectList";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectFilters } from "@/lib/types";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectGridItem } from "./ProjectGridItem";
import { ProjectDetailSkeleton } from "./ProjectDetail";
import { UserDetailSkeleton } from "../users/UserDetail";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { UserDetailModal } from "../users/UserDetailModal";
import { ProjectFormBaseSkeleton } from "./ProjectFormBase";
import { PersonHeaderSkeleton } from "../common/PersonHeader";
import { CommentItemSkeleton } from "../comments/CommentItem";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { getProjectList } from "@/lib/data/project/project.service";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { EditProjectFormContainer } from "./EditProjectFormContainer";
import { ProjectDetailBottomSheet } from "./ProjectDetailBottomSheet";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { UserDetailBottomSheet } from "../users/UserDetailBottomSheet";
import { ProjectCommentsModalTrigger } from "./ProjectCommentsModalTrigger";
import { ProjectItemActionMenuTrigger } from "./ProjectItemActionMenuTrigger";
import { PersonDetailPresentation } from "../common/PersonDetailPresentation";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

interface ProjectItemActionMenuTriggerSlotProps {
  projectId: number;
  projectTitle: string;
  projectStatus: ProjectStatus;
  className?: string;
}

function ProjectItemActionMenuTriggerSlot({
  projectId,
  projectTitle,
  projectStatus,
  className,
}: ProjectItemActionMenuTriggerSlotProps) {
  return (
    <ProjectItemActionMenuTrigger
      projectId={projectId}
      projectTitle={projectTitle}
      projectStatus={projectStatus}
      deleteAction={deleteProjects}
      updateStatusAction={updateProjectStatuses}
      editProjectFormContainer={
        <Suspense fallback={<ProjectFormBaseSkeleton />}>
          <EditProjectFormContainer projectId={projectId} />
        </Suspense>
      }
      className={className}
    />
  );
}

interface ProjectCommentsModalTriggerSlotProps {
  projectId: number;
  commentsCount: number;
}

function ProjectCommentsModalTriggerSlot({
  projectId,
  commentsCount,
}: ProjectCommentsModalTriggerSlotProps) {
  return (
    <ProjectCommentsModalTrigger
      projectId={projectId}
      commentsCount={commentsCount}
      projectCommentsContainer={
        <Suspense
          fallback={
            <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
          }
        >
          <ProjectCommentsContainer projectId={projectId} />
        </Suspense>
      }
      sendCommentAction={sendComment}
      updateCommentAction={updateComment}
    />
  );
}

function ProjectDetailModalSlot({ projectId }: { projectId: number }) {
  return (
    <ProjectDetailModal
      projectId={projectId}
      projectDetailContainer={
        <Suspense fallback={<ProjectDetailSkeleton />}>
          <ProjectDetailContainer projectId={projectId} />
        </Suspense>
      }
    />
  );
}

function ProjectDetailBottomSheetSlot({ projectId }: { projectId: number }) {
  return (
    <ProjectDetailBottomSheet
      projectId={projectId}
      projectDetailContainer={
        <Suspense fallback={<ProjectDetailSkeleton />}>
          <ProjectDetailContainer projectId={projectId} />
        </Suspense>
      }
    />
  );
}

function UserDetailSlotContent({ userId }: { userId: string }) {
  return (
    <Suspense
      fallback={
        <PersonDetailPresentation
          personHeader={<PersonHeaderSkeleton />}
          userDetail={<UserDetailSkeleton />}
        />
      }
    >
      <UserDetailContainer userId={userId} />
    </Suspense>
  );
}

function UserDetailModalSlot({ userId }: { userId: string }) {
  return (
    <UserDetailModal
      userId={userId}
      userDetailContainer={<UserDetailSlotContent userId={userId} />}
    />
  );
}

function UserDetailBottomSheetSlot({ userId }: { userId: string }) {
  return (
    <UserDetailBottomSheet
      userId={userId}
      userDetailContainer={<UserDetailSlotContent userId={userId} />}
    />
  );
}

interface ProjectsContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  filters?: ProjectFilters;
}

export async function ProjectsContainer({
  page,
  pageSize,
  sort,
  filters,
}: ProjectsContainerProps) {
  const { items: projects, totalCount } = await getProjectList({
    page,
    pageSize,
    sort,
    filters,
  });

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
      list={
        <ProjectList showCheckbox>
          {projects.map((project) => {
            const commonProps = {
              id: project.id,
              title: project.title,
              deadline: project.deadline,
              creator: project.creator,
              status: project.status,
              commentsCount: project.commentsCount,
            };

            return (
              <ProjectListItem
                key={project.id}
                showCheckbox
                customer={project.customer}
                company={project.customer?.company}
                category={project.category}
                menuTrigger={
                  <ProjectItemActionMenuTriggerSlot
                    projectId={project.id}
                    projectTitle={project.title}
                    projectStatus={project.status}
                  />
                }
                commentModalTrigger={
                  <ProjectCommentsModalTriggerSlot
                    projectId={project.id}
                    commentsCount={project.commentsCount}
                  />
                }
                projectDetailModal={
                  <ProjectDetailModalSlot projectId={project.id} />
                }
                projectDetailBottomSheet={
                  <ProjectDetailBottomSheetSlot projectId={project.id} />
                }
                userDetailModal={
                  project.creator && (
                    <UserDetailModalSlot userId={project.creator.id} />
                  )
                }
                {...commonProps}
              />
            );
          })}
        </ProjectList>
      }
      grid={
        <ProjectGrid>
          {projects.map((project) => {
            const commonProps = {
              id: project.id,
              title: project.title,
              deadline: project.deadline,
              creator: project.creator,
              status: project.status,
              commentsCount: project.commentsCount,
            };

            return (
              <ProjectGridItem
                key={project.id}
                tasksTotal={project.tasks.total}
                tasksCompleted={project.tasks.completed}
                menuTrigger={
                  <ProjectItemActionMenuTriggerSlot
                    projectId={project.id}
                    projectTitle={project.title}
                    projectStatus={project.status}
                    className="-mr-2"
                  />
                }
                commentModalTrigger={
                  <ProjectCommentsModalTriggerSlot
                    projectId={project.id}
                    commentsCount={project.commentsCount}
                  />
                }
                projectDetailModal={
                  <ProjectDetailModalSlot projectId={project.id} />
                }
                projectDetailBottomSheet={
                  <ProjectDetailBottomSheetSlot projectId={project.id} />
                }
                userDetailModal={
                  project.creator && (
                    <UserDetailModalSlot userId={project.creator.id} />
                  )
                }
                userDetailBottomSheet={
                  project.creator && (
                    <UserDetailBottomSheetSlot userId={project.creator.id} />
                  )
                }
                {...commonProps}
              />
            );
          })}
        </ProjectGrid>
      }
    />
  );
}
