import { ProjectList } from "../ProjectList";
import { ProjectGrid } from "../ProjectGrid";
import { ProjectListItem } from "../ProjectListItem";
import { ProjectGridItem } from "../ProjectGridItem";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { getProjectCount, getProjectList } from "@/lib/queries/project";
import { Pagination } from "@/components/common/Pagination";

interface ProjectsServerContainerProps {
  page: number;
  pageSize: number;
}

export async function ProjectsServerContainer({
  page,
  pageSize,
}: ProjectsServerContainerProps) {
  const workspaceId = await getUserWorkspaceId();
  const projects = await getProjectList({ page, pageSize, workspaceId });
  const count = await getProjectCount({ workspaceId });
  const totalPages = Math.ceil(count / pageSize);

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
                status={{
                  id: project.status.id,
                  name: project.status.name,
                }}
                category={project.category}
                comments={project._count.comments}
                showCheckbox
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
                status={{
                  id: project.status.id,
                  name: project.status.name,
                }}
                tasks={project.tasks.length}
                tasksDone={
                  project.tasks.filter((t) => t.statusId === "completed").length
                }
                comments={project._count.comments}
              />
            ))}
          </ProjectGrid>
        }
      />
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            baseUrl="/projects"
          />
        </div>
      )}
    </>
  );
}
