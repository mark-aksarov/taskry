import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button, RACDialogTrigger, Skeleton } from "@/components/ui";

import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ViewModeContainer,
  ViewModeToggleButtonGroup,
} from "@/components/common/ViewMode";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { FiltersModalTrigger } from "@/components/common/FiltersModalTrigger";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { getTaskCategories } from "@/lib/queries/task";
import { getUsers } from "@/lib/queries/user";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { getTasks } from "@/lib/queries/task";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { TaskCategoryCheckboxGroup } from "@/components/tasks/TaskCategoryCheckboxGroup";
import { ProjectCheckboxGroup } from "@/components/projects/ProjectCheckboxGroup";
import { getProjects } from "@/lib/queries/project";
import { TaskActionsMenuTrigger } from "@/components/tasks/TaskActionsMenuTrigger";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { FiltersFormSkeleton } from "@/components/common/FiltersFormSkeleton";
import { PageContainer } from "@/components/common/PageContainer";
import { NewTaskModal } from "@/components/tasks/NewTaskModal/NewTaskModal";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { TaskCategorySelect } from "@/components/tasks/TaskCategorySelect";
import { ProjectSelect } from "@/components/projects/ProjectSelect";
import { UserSelect } from "@/components/users/UserSelect";

export default async function TasksPage() {
  const categoriesPromise = getTaskCategories(1);
  const projectsPromise = getProjects();
  const usersPromise = getUsers(1);
  const tasks = await getTasks();

  const tasksFiltersForm = (
    <TaskFiltersForm
      categoryCheckboxGroup={
        <TaskCategoryCheckboxGroup categoriesPromise={categoriesPromise} />
      }
      projectCheckboxGroup={
        <ProjectCheckboxGroup projectsPromise={projectsPromise} />
      }
      creatorCheckboxGroup={<UserCheckboxGroup usersPromise={usersPromise} />}
    />
  );

  const newTaskForm = (
    <NewTaskForm
      taskCategorySelect={
        <TaskCategorySelect categoriesPromise={categoriesPromise} />
      }
      projectSelect={<ProjectSelect projectsPromise={projectsPromise} />}
      assigneeSelect={<UserSelect usersPromise={usersPromise} />}
    />
  );

  if (!tasks.length) {
    return (
      <PageContainer fullscreen centered>
        <EmptySection>
          <EmptySectionHeading>No tasks yet</EmptySectionHeading>
          <EmptySectionDescription>
            Create a new task to keep track of your work
          </EmptySectionDescription>
          <EmptySectionButton href="#">New Task</EmptySectionButton>
        </EmptySection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <FiltersModalTrigger
              filtersForm={
                <Suspense fallback={<FiltersFormSkeleton />}>
                  {tasksFiltersForm}
                </Suspense>
              }
            />
            <TaskActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <RACDialogTrigger>
              <Button
                label="New Task"
                iconLeft={
                  <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
              />
              <NewTaskModal
                newTaskForm={
                  <Suspense fallback={<Skeleton />}>{newTaskForm}</Suspense>
                }
              />
            </RACDialogTrigger>
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Tasks</ToolbarMobileHeading>
            <FiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<FiltersFormSkeleton />}>
                  {tasksFiltersForm}
                </Suspense>
              }
            />
            <TaskActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />

            <RACDialogTrigger>
              <Button
                label="New Task"
                iconLeft={
                  <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
              />
              <NewTaskModal
                newTaskForm={
                  <Suspense fallback={<Skeleton />}>{newTaskForm}</Suspense>
                }
              />
            </RACDialogTrigger>
          </ToolbarMobileBottom>
          <ViewModeContainer
            list={<TaskList tasks={tasks} />}
            grid={<TaskGrid tasks={tasks} />}
          />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
