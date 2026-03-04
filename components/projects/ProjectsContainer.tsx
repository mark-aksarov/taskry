import "server-only";

import { ProjectItem } from "./ProjectItem";
import { ProjectList } from "./ProjectList";
import { ProjectGrid } from "./ProjectGrid";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { ProjectDetailContainer } from "./ProjectDetailContainer";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";
import { updateProject } from "@/lib/actions/project/updateProject";
import { deleteProject } from "@/lib/actions/project/deleteProject";
import { EditProjectFormContainer } from "./EditProjectFormContainer";
import { ProjectCommentsContainer } from "./ProjectCommentsContainer";
import { CustomerDetailContainer } from "../customer/CustomerDetailContainer";
import { updateProjectStatus } from "@/lib/actions/project/updateProjectStatus";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

interface ProjectsContainerProps {
  projects: ProjectListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function ProjectsContainer({
  projects,
  totalCount,
  page,
  pageSize,
}: ProjectsContainerProps) {
  const items = (
    <>
      {projects.map((project) => {
        return (
          <ProjectItem
            key={project.id}
            id={project.id}
            title={project.title}
            deadline={project.deadline}
            creator={project.creator}
            status={project.status}
            commentsCount={project.commentsCount}
            customer={project.customer}
            company={project.customer?.company}
            category={project.category}
            tasksTotal={project.tasks.total}
            tasksCompleted={project.tasks.completed}
            editProjectFormContainer={
              <EditProjectFormContainer projectId={project.id} />
            }
            projectCommentsContainer={
              <ProjectCommentsContainer projectId={project.id} />
            }
            projectDetailContainer={
              <ProjectDetailContainer projectId={project.id} />
            }
            userDetailContainer={
              project.creator && (
                <UserDetailContainer userId={project.creator.id} />
              )
            }
            customerDetailContainer={
              project.customer && (
                <CustomerDetailContainer customerId={project.customer.id} />
              )
            }
            sendComment={sendComment}
            updateComment={updateComment}
            updateProject={updateProject}
            deleteProject={deleteProject}
            updateProjectStatus={updateProjectStatus}
          />
        );
      })}
    </>
  );

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
      list={<ProjectList>{items}</ProjectList>}
      grid={<ProjectGrid>{items}</ProjectGrid>}
    />
  );
}
