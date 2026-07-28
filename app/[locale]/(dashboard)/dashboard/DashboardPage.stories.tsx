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
  TotalClientsCard,
  TotalClientsCardSkeleton,
} from "@/dashboard/client/TotalClientsCard";

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { DashboardPage } from "./DashboardPage";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { TaskGridSkeleton } from "@/dashboard/tasks/TaskGrid";
import { CreateTaskForm } from "@/dashboard/tasks/CreateTaskForm";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { TaskFormSkeleton } from "@/dashboard/tasks/TaskFormSkeleton";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { TaskGridExample } from "@/dashboard/tasks/TaskGrid/__stories__";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";

const meta = {
  title: "pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
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
    selectedItems: [],
    totalProjectsCardContainer: <TotalProjectsCard totalProjects={50} />,
    totalTasksCardContainer: <TotalTasksCard totalTasks={500} />,
    totalUsersCardContainer: <TotalUsersCard totalUsers={15} />,
    totalClientsCardContainer: <TotalClientsCard totalClients={20} />,
    taskGrid: <TaskGridExample showCheckbox={false} />,
    searchContainer: <SearchListExample />,
    createTaskFormContainer: (
      <CreateTaskForm
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    totalProjectsCardContainer: <TotalProjectsCardSkeleton />,
    totalTasksCardContainer: <TotalTasksCardSkeleton />,
    totalUsersCardContainer: <TotalUsersCardSkeleton />,
    totalClientsCardContainer: <TotalClientsCardSkeleton />,
    taskGrid: <TaskGridSkeleton viewMode="list" showCheckbox={false} />,
    createTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;

export const WithNoTasks = {
  args: {
    ...Default.args,
    totalTaskCount: 0,
    taskGrid: <TaskGridExample showCheckbox={false} />,
  },
} satisfies Story;
