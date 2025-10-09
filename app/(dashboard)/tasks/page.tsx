import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { FiltersSideSheetTrigger } from "@/components/common/FiltersSideSheetTrigger";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { getTaskCategories } from "@/lib/queries/task";
import { getUsers } from "@/lib/queries/user";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { getTasks } from "@/lib/queries/task";
import {
  TaskFiltersForm,
  TaskFiltersFormSkeleton,
} from "@/components/tasks/TaskFiltersForm";
import { TaskCategoryCheckboxGroup } from "@/components/tasks/TaskCategoryCheckboxGroup";
import { ProjectCheckboxGroup } from "@/components/projects/ProjectCheckboxGroup";
import { getProjects } from "@/lib/queries/project";
import { TaskActionsMenuTrigger } from "@/components/tasks/TaskActionsMenuTrigger";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskGrid } from "@/components/tasks/TaskGrid";

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

  if (!tasks.length) {
    return (
      <Centered>
        <EmptySection>
          <EmptySectionHeading>No tasks yet</EmptySectionHeading>
          <EmptySectionDescription>
            Create a new task to keep track of your work
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Task</EmptySectionLink>
        </EmptySection>
      </Centered>
    );
  }

  return (
    <PageGrid>
      <ViewModeProvider>
        <ToolbarDesktop>
          <FiltersSideSheetTrigger
            filtersForm={
              <Suspense fallback={<TaskFiltersFormSkeleton />}>
                {tasksFiltersForm}
              </Suspense>
            }
          />
          <TaskActionsMenuTrigger />
          <ViewModeToggleButtonGroup className="ml-auto" />
          <Button
            label="New Task"
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <ToolbarMobileHeading>Tasks</ToolbarMobileHeading>
          <FiltersBottomSheetTrigger
            filtersForm={
              <Suspense fallback={<TaskFiltersFormSkeleton />}>
                {tasksFiltersForm}
              </Suspense>
            }
          />
          <TaskActionsMenuTrigger />
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ViewModeToggleButtonGroup />
          <Button
            label="New Task"
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        </ToolbarMobileBottom>
        <TaskList tasks={tasks} />
        <TaskGrid tasks={tasks} />
      </ViewModeProvider>
    </PageGrid>
  );
}
