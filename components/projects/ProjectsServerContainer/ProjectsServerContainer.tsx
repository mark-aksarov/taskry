import { ProjectList } from "../ProjectList";
import { ProjectGrid } from "../ProjectGrid";
import { getProjects } from "@/lib/queries/project";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { ProjectListItem } from "../ProjectListItem";
import { ProjectGridItem } from "../ProjectGridItem";

export async function ProjectsServerContainer() {
  const projects = await getProjects();

  return (
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
                name: project.status.nameEn,
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
                name: project.status.nameEn,
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
  );
}
