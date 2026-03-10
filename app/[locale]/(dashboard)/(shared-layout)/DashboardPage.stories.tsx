import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "@/components/projects/TotalProjectsCard";

import {
  TotalTasksCard,
  TotalTasksCardSkeleton,
} from "@/components/tasks/TotalTasksCard";

import {
  TotalUsersCard,
  TotalUsersCardSkeleton,
} from "@/components/users/TotalUsersCard";

import {
  TotalCustomersCard,
  TotalCustomersCardSkeleton,
} from "@/components/customer/TotalCustomersCard";

import {
  AssignedTasksSkeleton,
  AssignedTasksPresentation,
} from "@/components/tasks/AssignedTasks";

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { mockedTaskList } from "@/mocks/tasks";
import { DashboardPage } from "./DashboardPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { AssignedTaskList } from "@/components/tasks/AssignedTaskList";
import { NewSubtaskModal } from "@/components/subtasks/NewSubtaskModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { newTaskFormArgs } from "@/components/tasks/NewTaskForm/__stories__";
import { AssignedTaskListItem } from "@/components/tasks/AssignedTaskListItem";
import { TaskListItemStory } from "@/components/tasks/TaskListItem/__stories__";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskContext/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext/__stories__";

const meta = {
  title: "pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <NewSubtaskModal taskId={1} />
      </>
    ),
    withCreateSubtaskProvider,
    withUpdateTaskStatusesProvider,
    withDeleteTasksProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const AssignedTasksContainer = ({ totalCount }: { totalCount: number }) => (
  <AssignedTasksPresentation
    totalCount={totalCount}
    page={1}
    pageSize={5}
    list={
      <AssignedTaskList>
        {mockedTaskList.map((task) => (
          <AssignedTaskListItem
            key={task.id}
            {...TaskListItemStory.args}
            {...task}
            updateComment={() => ({ status: "success" })}
            updateTask={() => ({ status: "success" })}
            deleteTask={() => ({ status: "success" })}
            updateTaskStatus={() => ({ status: "success" })}
          />
        ))}
      </AssignedTaskList>
    }
    totalPages={3}
  />
);

export const Default = {
  args: {
    totalProjectsCardContainer: <TotalProjectsCard totalProjects={50} />,
    totalTasksCardContainer: <TotalTasksCard totalTasks={500} />,
    totalUsersCardContainer: <TotalUsersCard totalUsers={15} />,
    totalCustomersCardContainer: <TotalCustomersCard totalCustomers={20} />,
    assignedTasksContainer: <AssignedTasksContainer totalCount={5} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    totalProjectsCardContainer: <TotalProjectsCardSkeleton />,
    totalTasksCardContainer: <TotalTasksCardSkeleton />,
    totalUsersCardContainer: <TotalUsersCardSkeleton />,
    totalCustomersCardContainer: <TotalCustomersCardSkeleton />,
    assignedTasksContainer: <AssignedTasksSkeleton />,
  },
} satisfies Story;

export const WithNoTasks = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <NewTaskModal
          newTaskFormContainer={<NewTaskForm {...newTaskFormArgs} />}
        />
      </>
    ),
    withCreateTaskProvider,
  ],
  args: {
    ...Default.args,
    assignedTasksContainer: <AssignedTasksContainer totalCount={0} />,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
