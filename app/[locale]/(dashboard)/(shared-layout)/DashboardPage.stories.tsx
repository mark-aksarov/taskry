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
  AssignedTasksPresentation,
  AssignedTasksSection,
  AssignedTasksSectionHeading,
} from "@/components/tasks/AssignedTasks";

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { mockedTaskList } from "@/mocks/tasks";
import { DashboardPage } from "./DashboardPage";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { TaskGridMobile } from "@/components/tasks/TaskGrid";
import { TaskListSkeleton } from "@/components/tasks/TaskList";
import { CreateTaskForm } from "@/components/tasks/CreateTaskForm";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { AssignedTaskList } from "@/components/tasks/AssignedTaskList";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskGridMobileStory } from "@/components/tasks/TaskGrid/__stories__";
import { AssignedTaskListItem } from "@/components/tasks/AssignedTaskListItem";
import { TaskListItemStory } from "@/components/tasks/TaskListItem/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withCreateTaskProvider } from "@/components/tasks/CreateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider/__stories__";
import { MockedTaskItemWrapper } from "@/components/tasks/TaskItemWrapper/__stories__";

const meta = {
  title: "pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withCreateSubtaskProvider,
    withUpdateTaskStatusesProvider,
    withDeleteTasksProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    SharedPageDecorator,
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
    listLarge={
      <AssignedTaskList>
        {mockedTaskList.map((task) => (
          <MockedTaskItemWrapper key={task.id}>
            <AssignedTaskListItem {...TaskListItemStory.args} {...task} />
          </MockedTaskItemWrapper>
        ))}
      </AssignedTaskList>
    }
    gridMobile={<TaskGridMobile {...TaskGridMobileStory.args} />}
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
    assignedTasksContainer: (
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <TaskListSkeleton items={10} showCheckbox={false} />
      </AssignedTasksSection>
    ),
  },
} satisfies Story;

export const WithNoTasks = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <CreateTaskModal
          createTaskFormContainer={
            <CreateTaskForm
              forcedAssigneeId={mockedUserSummaries[0].id}
              categorySelectItems={mockedTaskCategorySummaries}
              projectSelectItems={mockedProjectSummaries}
              assigneeSelectItems={mockedUserSummaries}
            />
          }
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
