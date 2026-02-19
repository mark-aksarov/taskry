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
  AssignedTasksEmptySection,
  AssignedTasksPresentation,
} from "@/components/tasks/AssignedTasks";

import { fn, mocked } from "storybook/test";
import { DashboardPage } from "./DashboardPage";
import { TaskList } from "@/components/tasks/TaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { SearchModal } from "@/components/search/SearchModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getTaskListItems } from "@/components/tasks/TaskList/__stories__";
import { NewTaskFormStory } from "@/components/tasks/NewTaskForm/__stories__";
import { SearchModalStory } from "@/components/search/SearchModal/__stories__";
import { withDeleteTaskModalProvider } from "@/components/tasks/DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withDeleteSubtaskModalProvider } from "@/components/subtasks/DeleteSubtaskModal/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";

const meta = {
  title: "pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withDeleteTaskModalProvider,
    withEntityPaginationProvider,
    withSelectedTasksProvider,
    withDeleteSubtaskModalProvider,
    withDeleteCommentModalProvider,
    withUpdateTaskStatusesProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const AssignedTasksContainer = () => (
  <AssignedTasksPresentation
    page={1}
    pageSize={5}
    list={
      <TaskList
        showCheckbox={false}
        children={getTaskListItems({ showCheckbox: false })}
      />
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
    assignedTasksContainer: <AssignedTasksContainer />,
    searchModal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    totalProjectsCardContainer: <TotalProjectsCardSkeleton />,
    totalTasksCardContainer: <TotalTasksCardSkeleton />,
    totalUsersCardContainer: <TotalUsersCardSkeleton />,
    totalCustomersCardContainer: <TotalCustomersCardSkeleton />,
    assignedTasksContainer: <AssignedTasksSkeleton />,
    searchModal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;

export const WithNoTasks = {
  args: {
    ...Default.args,
    assignedTasksContainer: (
      <AssignedTasksEmptySection
        newTaskFormContainer={<NewTaskForm {...NewTaskFormStory.args} />}
      />
    ),
  },
} satisfies Story;
