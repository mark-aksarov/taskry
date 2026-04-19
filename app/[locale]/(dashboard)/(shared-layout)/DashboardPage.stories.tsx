import {
  TotalTasksCard,
  TotalTasksCardSkeleton,
} from "@/components/tasks/TotalTasksCard";

import {
  TotalUsersCard,
  TotalUsersCardSkeleton,
} from "@/components/users/TotalUsersCard";

import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "@/components/projects/TotalProjectsCard";

import {
  TotalCustomersCard,
  TotalCustomersCardSkeleton,
} from "@/components/customer/TotalCustomersCard";

import {
  TaskListItem,
  TaskListItemSkeleton,
} from "@/components/tasks/TaskListItem";

import {
  TaskGridItemMobile,
  TaskGridItemMobileSkeleton,
} from "@/components/tasks/TaskGridItem";

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { mockedTaskList } from "@/mocks/tasks";
import { DashboardPage } from "./DashboardPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskListItemStory } from "@/components/tasks/TaskListItem/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { TaskGridItemMobileStory } from "@/components/tasks/TaskGridItem/__stories__";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider/__stories__";
import { MockedDeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "@/components/tasks/UpdateTaskProvider/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";
import { MockedUpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider/__stories__";

const meta = {
  title: "pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withCreateSubtaskProvider,
    withUpdateTaskStatusesProvider,
    withDeleteTasksProvider,
    withCreateTaskProvider,
    withSelectedTasksProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function AssignedTasksContainer() {
  return (
    <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
      {mockedTaskList.map((task) => (
        <MockedDeleteTaskProvider>
          <MockedUpdateTaskProvider>
            <MockedUpdateTaskStatusProvider>
              <TaskListItem
                {...TaskListItemStory.args}
                {...task}
                showCheckbox={false}
              />
              <TaskGridItemMobile {...TaskGridItemMobileStory.args} {...task} />
            </MockedUpdateTaskStatusProvider>
          </MockedUpdateTaskProvider>
        </MockedDeleteTaskProvider>
      ))}
    </EntityContainerPresentation>
  );
}

export const Default = {
  args: {
    totalTaskCount: 10,
    totalProjectsCardContainer: <TotalProjectsCard totalProjects={50} />,
    totalTasksCardContainer: <TotalTasksCard totalTasks={500} />,
    totalUsersCardContainer: <TotalUsersCard totalUsers={15} />,
    totalCustomersCardContainer: <TotalCustomersCard totalCustomers={20} />,
    tasksContainer: <AssignedTasksContainer />,
  },
} satisfies Story;

export const Loading = {
  args: {
    totalTaskCount: 10,
    totalProjectsCardContainer: <TotalProjectsCardSkeleton />,
    totalTasksCardContainer: <TotalTasksCardSkeleton />,
    totalUsersCardContainer: <TotalUsersCardSkeleton />,
    totalCustomersCardContainer: <TotalCustomersCardSkeleton />,
    tasksContainer: (
      <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
        {mockedTaskList.map(() => (
          <>
            <TaskListItemSkeleton showCheckbox={false} />
            <TaskGridItemMobileSkeleton />
          </>
        ))}
      </EntityContainerPresentation>
    ),
  },
} satisfies Story;

export const WithNoTasks = {
  args: {
    ...Default.args,
    totalTaskCount: 0,
    tasksContainer: <AssignedTasksContainer />,
  },
} satisfies Story;
