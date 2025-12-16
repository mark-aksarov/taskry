import { ProjectList } from "../ProjectList";
import { ProjectGrid } from "../ProjectGrid";
import { ProjectListItem } from "../ProjectListItem";
import { ProjectGridItem } from "../ProjectGridItem";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getProjectCount, getProjectList } from "@/lib/data/project";
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

  return (
    <>
      <ViewModeLayout
        list={
          <ProjectList>
            {projects.map((project) => (
              <ProjectListItem
                key={project.id}
                id={project.id}
                title={project.title}
                deadline={project.deadline}
                creator={
                  project.creator
                    ? {
                        id: project.creator.id,
                        fullName: project.creator.fullName,
                        imageUrl: project.creator.imageUrl ?? undefined,
                      }
                    : undefined
                }
                customer={
                  project.customer
                    ? {
                        id: project.customer.id,
                        fullName: project.customer.fullName,
                        imageUrl: project.customer.imageUrl ?? undefined,
                      }
                    : undefined
                }
                company={
                  project.customer?.company
                    ? {
                        id: project.customer.company.id,
                        name: project.customer.company.name,
                      }
                    : undefined
                }
                status={project.status}
                category={project.category}
                comments={project._count.comments}
                showCheckbox
                deleteAction={handleDeleteProject}
                updateStatusAction={updateProjectStatus}
              />
            ))}
          </ProjectList>
        }
        grid={
          <ProjectGrid>
            {projects.map((project) => (
              <ProjectGridItem
                key={project.id}
                id={project.id}
                title={project.title}
                deadline={project.deadline}
                creator={
                  project.creator
                    ? {
                        id: project.creator.id,
                        fullName: project.creator.fullName,
                        imageUrl: project.creator.imageUrl ?? undefined,
                      }
                    : undefined
                }
                status={project.status}
                tasks={project.tasks.length}
                tasksDone={
                  project.tasks.filter((t) => t.status === "completed").length
                }
                comments={project._count.comments}
                deleteAction={handleDeleteProject}
                updateStatusAction={updateProjectStatus}
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
