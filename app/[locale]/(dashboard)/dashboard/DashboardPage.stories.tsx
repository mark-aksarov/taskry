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

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { DashboardPage } from "./DashboardPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridSkeleton } from "@/dashboard/tasks/TaskGrid";
import { TaskGridExample } from "@/dashboard/tasks/TaskGrid/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DashboardPageDecorator } from "@/.storybook/DashboardPageDecorator";
import { withTaskSearchModal } from "@/dashboard/tasks/TaskSearchModal/__stories__";
import { withCreateTaskProvider } from "@/dashboard/tasks/CreateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext/__stories__";
import { withCreateSubtaskProvider } from "@/dashboard/subtasks/CreateSubtaskProvider/__stories__";
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
    DashboardPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/dashboard");
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskPage: 1,
    taskPageSize: 1,
    totalTaskCount: 3,
    totalProjectsCardContainer: <TotalProjectsCard totalProjects={50} />,
    totalTasksCardContainer: <TotalTasksCard totalTasks={500} />,
    totalUsersCardContainer: <TotalUsersCard totalUsers={15} />,
    totalCustomersCardContainer: <TotalCustomersCard totalCustomers={20} />,
    taskGrid: <TaskGridExample showCheckbox={false} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    totalProjectsCardContainer: <TotalProjectsCardSkeleton />,
    totalTasksCardContainer: <TotalTasksCardSkeleton />,
    totalUsersCardContainer: <TotalUsersCardSkeleton />,
    totalCustomersCardContainer: <TotalCustomersCardSkeleton />,
    taskGrid: <TaskGridSkeleton viewMode="list" showCheckbox={false} />,
  },
} satisfies Story;

export const WithNoTasks = {
  args: {
    ...Default.args,
    totalTaskCount: 0,
    taskGrid: <TaskGridExample showCheckbox={false} />,
  },
} satisfies Story;
