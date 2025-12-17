import { ProjectList } from "../ProjectList";
import { ProjectGrid } from "../ProjectGrid";
import { ProjectListItem } from "../ProjectListItem";
import { ProjectGridItem } from "../ProjectGridItem";
import { ProjectListItemDTO } from "@/lib/dto/project";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getProjectCount, getProjectList } from "@/lib/dal/project";
import { deleteProjectAction } from "@/lib/actions/deleteProjectAction";
import { updateProjectStatus } from "@/lib/actions/updateProjectStatus";

interface ProjectsServerContainerProps {
  page: number;
  pageSize: number;
}

export async function ProjectsServerContainer({
  page,
  pageSize,
}: ProjectsServerContainerProps) {
  const projects = await getProjectList({ page, pageSize });
  const count = await getProjectCount();
  const totalPages = Math.ceil(count / pageSize);
  const isLastItemOnPage = projects.length === 1;

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl: "/projects",
  };

  const handleDeleteProject = async (prevState: any, id: number) => {
    "use server";
    return deleteProjectAction(prevState, {
      id,
      currentPage: page,
      isLastItemOnPage,
    });
  };

  const getCommonProps = (project: ProjectListItemDTO) => ({
    key: project.id,
    id: project.id,
    title: project.title,
    deadline: project.deadline,
    creator: project.creator,
    status: project.status,
    commentsCount: project.commentsCount,
    deleteAction: handleDeleteProject,
    updateStatusAction: updateProjectStatus,
  });

  return (
    <>
      <ViewModeLayout
        list={
          <ProjectList>
            {projects.map((project) => (
              <ProjectListItem
                {...getCommonProps(project)}
                customer={project.customer}
                company={project.customer?.company}
                category={project.category}
                showCheckbox
              />
            ))}
          </ProjectList>
        }
        grid={
          <ProjectGrid>
            {projects.map((project) => (
              <ProjectGridItem
                {...getCommonProps(project)}
                tasksTotal={project.tasks.total}
                tasksCompleted={project.tasks.completed}
              />
            ))}
          </ProjectGrid>
        }
      />

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            {...paginationProps}
            size="large"
            className="max-md:hidden"
          />
          <Pagination {...paginationProps} className="md:hidden" />
        </div>
      )}
    </>
  );
}
