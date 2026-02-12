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
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getTaskListItems } from "@/components/tasks/TaskList/TaskList.stories";
import { Default as NewTaskFormStory } from "@/components/tasks/NewTaskForm/NewTaskForm.stories";

const meta = {
  title: "pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof DashboardPage>;

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
  render: () => (
    <DashboardPage
      totalProjectsCardContainer={<TotalProjectsCard totalProjects={50} />}
      totalTasksCardContainer={<TotalTasksCard totalTasks={500} />}
      totalUsersCardContainer={<TotalUsersCard totalUsers={15} />}
      totalCustomersCardContainer={<TotalCustomersCard totalCustomers={20} />}
      assignedTasksContainer={<AssignedTasksContainer />}
    />
  ),
} satisfies Story;

export const Loading = {
  render: () => (
    <DashboardPage
      totalProjectsCardContainer={<TotalProjectsCardSkeleton />}
      totalTasksCardContainer={<TotalTasksCardSkeleton />}
      totalUsersCardContainer={<TotalUsersCardSkeleton />}
      totalCustomersCardContainer={<TotalCustomersCardSkeleton />}
      assignedTasksContainer={<AssignedTasksSkeleton />}
    />
  ),
} satisfies Story;

export const WithNoTasks = {
  render: () => (
    <DashboardPage
      totalProjectsCardContainer={<TotalProjectsCard totalProjects={50} />}
      totalTasksCardContainer={<TotalTasksCard totalTasks={500} />}
      totalUsersCardContainer={<TotalUsersCard totalUsers={15} />}
      totalCustomersCardContainer={<TotalCustomersCard totalCustomers={20} />}
      assignedTasksContainer={
        <AssignedTasksEmptySection
          newTaskFormContainer={<NewTaskForm {...NewTaskFormStory.args} />}
        />
      }
    />
  ),
} satisfies Story;
