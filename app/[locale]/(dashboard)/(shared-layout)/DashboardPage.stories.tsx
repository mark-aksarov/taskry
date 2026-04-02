import {
  TaskGridMobile,
  TaskGridMobileSkeleton,
} from "@/components/tasks/TaskGrid";

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

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { mockedTaskList } from "@/mocks/tasks";
import { DashboardPage } from "./DashboardPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListSkeleton } from "@/components/tasks/TaskList";
import { AssignedTaskList } from "@/components/tasks/AssignedTaskList";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskGridMobileStory } from "@/components/tasks/TaskGrid/__stories__";
import { AssignedTaskListItem } from "@/components/tasks/AssignedTaskListItem";
import { TaskListItemStory } from "@/components/tasks/TaskListItem/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { MockedTaskItemWrapper } from "@/components/tasks/TaskItemWrapper/__stories__";
import { AssignedTasksPresentation } from "@/components/tasks/AssignedTasksPresentation";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";
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

const AssignedTasksContainer = () => (
  <AssignedTasksPresentation
    page={1}
    pageSize={5}
    listLarge={() => (
      <AssignedTaskList>
        {mockedTaskList.map((task) => (
          <MockedTaskItemWrapper key={task.id}>
            <AssignedTaskListItem {...TaskListItemStory.args} {...task} />
          </MockedTaskItemWrapper>
        ))}
      </AssignedTaskList>
    )}
    gridMobile={() => <TaskGridMobile {...TaskGridMobileStory.args} />}
    totalPages={3}
  />
);

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
      <AssignedTasksPresentation
        page={1}
        pageSize={5}
        listLarge={() => <TaskListSkeleton items={10} showCheckbox={false} />}
        gridMobile={() => <TaskGridMobileSkeleton items={10} />}
        totalPages={3}
      />
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
