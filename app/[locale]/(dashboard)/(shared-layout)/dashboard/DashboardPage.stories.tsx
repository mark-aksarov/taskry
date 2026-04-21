import {
  TotalTasksCard,
  TotalTasksCardSkeleton,
} from "@/dashboard/tasks/TotalTasksCard";

import {
  TotalUsersCard,
  TotalUsersCardSkeleton,
} from "@/dashboard/users/TotalUsersCard";

import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "@/dashboard/projects/TotalProjectsCard";

import {
  TotalCustomersCard,
  TotalCustomersCardSkeleton,
} from "@/dashboard/customer/TotalCustomersCard";

import {
  TaskListItem,
  TaskListItemSkeleton,
} from "@/dashboard/tasks/TaskListItem";

import {
  TaskGridItemMobile,
  TaskGridItemMobileSkeleton,
} from "@/dashboard/tasks/TaskGridItem";

import { Fragment } from "react";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { mockedTaskList } from "@/mocks/tasks";
import { DashboardPage } from "./DashboardPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { withCreateTaskProvider } from "@/dashboard/tasks/CreateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider/__stories__";
import { MockedDeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "@/dashboard/tasks/UpdateTaskProvider/__stories__";
import { EntityContainerPresentation } from "@/dashboard/common/EntityContainerPresentation";
import { withSelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext/__stories__";
import { withCreateSubtaskProvider } from "@/dashboard/subtasks/CreateSubtaskProvider/__stories__";
import { MockedUpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider/__stories__";

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
    mocked(usePathname).mockReturnValue("/dashboard");
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function AssignedTasksContainer() {
  return (
    <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
      {mockedTaskList.map((task) => (
        <MockedDeleteTaskProvider key={task.id}>
          <MockedUpdateTaskProvider>
            <MockedUpdateTaskStatusProvider>
              <TaskListItem {...task} showCheckbox={false} />
              <TaskGridItemMobile
                {...task}
                subtasksTotal={task.subtasks.total}
                subtasksDone={task.subtasks.done}
              />
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
        {mockedTaskList.map((task) => (
          <Fragment key={task.id}>
            <TaskListItemSkeleton showCheckbox={false} />
            <TaskGridItemMobileSkeleton />
          </Fragment>
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
