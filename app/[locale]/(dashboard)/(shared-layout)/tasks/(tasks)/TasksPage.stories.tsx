import {
  TaskGridItemLarge,
  TaskGridItemMobile,
} from "@/components/tasks/TaskGridItem";

import {
  TaskGridItemLargeStory,
  TaskGridItemMobileStory,
} from "@/components/tasks/TaskGridItem/__stories__";

import { TasksPage } from "./TasksPage";
import TasksPageLoading from "./loading";
import { mocked } from "storybook/test";
import { mockedTaskList } from "@/mocks/tasks";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { TaskListItem } from "@/components/tasks/TaskListItem";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskListItemStory } from "@/components/tasks/TaskListItem/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskProvider/__stories__";
import { withTaskFiltersProvider } from "@/components/tasks/TaskFiltersContext/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider/__stories__";
import { MockedDeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "@/components/tasks/UpdateTaskProvider/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { MockedUpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider/__stories__";
import { withCreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryProvider/__stories__";

const meta = {
  title: "pages/TasksPage",
  component: TasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withTaskFiltersProvider,
    withCreateTaskCategoryProvider,
    withCreateTaskProvider,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withSelectedTasksProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks");
    mocked(useParams).mockReturnValue({
      id: "user-1",
    });
  },
} satisfies Meta<typeof TasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 3,
    totalFilteredTasks: 3,
    selectedSortField: "title",
    tasksContainer: (
      <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
        {mockedTaskList.map((task) => (
          <MockedDeleteTaskProvider key={task.id}>
            <MockedUpdateTaskProvider>
              <MockedUpdateTaskStatusProvider>
                <TaskListItem
                  {...TaskListItemStory.args}
                  {...task}
                  showCheckbox={true}
                />
                <TaskGridItemMobile
                  {...TaskGridItemMobileStory.args}
                  {...task}
                />
                <TaskGridItemLarge {...TaskGridItemLargeStory.args} {...task} />
              </MockedUpdateTaskStatusProvider>
            </MockedUpdateTaskProvider>
          </MockedDeleteTaskProvider>
        ))}
      </EntityContainerPresentation>
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTasks = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredTasks: 0 },
} satisfies Story;
