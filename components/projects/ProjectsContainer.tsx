import { ProjectList } from "./ProjectList";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectFilters } from "@/lib/types";
import { ProjectListItem } from "./ProjectListItem";
import { ProjectGridItem } from "./ProjectGridItem";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { getProjectList } from "@/lib/data/project/project.service";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { ProjectCommentsModalTrigger } from "./ProjectCommentsModalTrigger";
import { ProjectItemActionMenuTrigger } from "./ProjectItemActionMenuTrigger";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

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

  const getCommonProps = (project: ProjectListItemDTO) => ({
    id: project.id,
    title: project.title,
    deadline: project.deadline,
    creator: project.creator,
    status: project.status,
    commentsCount: project.commentsCount,
    deleteAction: deleteProjects,
    updateStatusAction: updateProjectStatuses,
  });

  const renderMenuTrigger = (
    project: ProjectListItemDTO,
    className?: string,
  ) => {
    return (
      <ProjectItemActionMenuTrigger
        projectId={project.id}
        projectTitle={project.title}
        projectStatus={project.status}
        deleteAction={deleteProjects}
        updateStatusAction={updateProjectStatuses}
        className={className}
      />
    );
  };

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      list={
        <ProjectList showCheckbox>
          {projects.map((project) => (
            <ProjectListItem
              showCheckbox
              key={project.id}
              customer={project.customer}
              company={project.customer?.company}
              category={project.category}
              commentModalTrigger={
                <ProjectCommentsModalTrigger
                  projectId={project.id}
                  commentsCount={project.commentsCount}
                  sendCommentAction={sendComment}
                />
              }
              menuTrigger={renderMenuTrigger(project)}
              {...getCommonProps(project)}
            />
          ))}
        </ProjectList>
      }
      grid={
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectGridItem
              key={project.id}
              tasksTotal={project.tasks.total}
              commentModalTrigger={
                <ProjectCommentsModalTrigger
                  projectId={project.id}
                  commentsCount={project.commentsCount}
                  sendCommentAction={sendComment}
                />
              }
              menuTrigger={renderMenuTrigger(project, "-mr-2")}
              tasksCompleted={project.tasks.completed}
              {...getCommonProps(project)}
            />
          ))}
        </ProjectGrid>
      }
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
