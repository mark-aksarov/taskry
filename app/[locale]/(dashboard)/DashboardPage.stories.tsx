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
import { mockedTaskList } from "@/mocks/tasks";
import { DashboardPage } from "./DashboardPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { AssignedTaskList } from "@/components/tasks/AssignedTaskList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { newTaskFormArgs } from "@/components/tasks/NewTaskForm/__stories__";
import { AssignedTaskListItem } from "@/components/tasks/AssignedTaskListItem";
import { TaskListItemStory } from "@/components/tasks/TaskListItem/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [withPageTransitionProvider, PageDecorator, withThemedBackground],
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
      <AssignedTaskList>
        {mockedTaskList.map((task) => (
          <AssignedTaskListItem
            key={task.id}
            {...TaskListItemStory.args}
            {...task}
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
    assignedTasksContainer: <AssignedTasksContainer />,
    appHeaderProps: AppHeaderStory.args,
  },
} satisfies Story;

export const Loading = {
  args: {
    totalProjectsCardContainer: <TotalProjectsCardSkeleton />,
    totalTasksCardContainer: <TotalTasksCardSkeleton />,
    totalUsersCardContainer: <TotalUsersCardSkeleton />,
    totalCustomersCardContainer: <TotalCustomersCardSkeleton />,
    assignedTasksContainer: <AssignedTasksSkeleton />,
    appHeaderProps: AppHeaderStory.args,
  },
} satisfies Story;

export const WithNoTasks = {
  args: {
    ...Default.args,
    assignedTasksContainer: (
      <AssignedTasksEmptySection
        newTaskFormContainer={<NewTaskForm {...newTaskFormArgs} />}
      />
    ),
  },
} satisfies Story;
