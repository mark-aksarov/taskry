import { ProjectList } from "../ProjectList";
import { ProjectGrid } from "../ProjectGrid";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ProjectListItem } from "../ProjectListItem";
import { ProjectGridItem } from "../ProjectGridItem";
import { ProjectListItemDTO } from "@/lib/dto/project";
import { Pagination } from "@/components/common/Pagination";
import { deleteProject } from "@/lib/actions/deleteProject";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getProjectCount, getProjectList } from "@/lib/dal/project";
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

  // If the page is out of bounds, redirect to the previous page
  // this can be happening when deleting a project
  if (projects.length === 0 && count > 0 && page > 1) {
    const prevPage = page - 1;
    const locale = await getLocale();

    redirect({ href: `/projects?page=${prevPage}`, locale });
  }

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl: "/projects",
  };

  const getCommonProps = (project: ProjectListItemDTO) => ({
    id: project.id,
    title: project.title,
    deadline: project.deadline,
    creator: project.creator,
    status: project.status,
    commentsCount: project.commentsCount,
    deleteAction: deleteProject,
    updateStatusAction: updateProjectStatus,
  });

  return (
    <>
      <ViewModeLayout
        list={
          <ProjectList>
            {projects.map((project) => (
              <ProjectListItem
                key={project.id}
                customer={project.customer}
                company={project.customer?.company}
                category={project.category}
                showCheckbox
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
                tasksCompleted={project.tasks.completed}
                {...getCommonProps(project)}
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
