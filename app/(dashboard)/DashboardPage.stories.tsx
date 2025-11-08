import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardPage } from "./DashboardPage";
import { PageDecorator, withBackgroundVariant } from "@/.storybook/decorators";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "@/components/dashboard/TotalProjectsCard";
import {
  AssignedTasks,
  AssignedTasksEmpty,
  AssignedTasksSkeleton,
} from "@/components/tasks/AssignedTasks";
import {
  TotalTasksCard,
  TotalTasksCardSkeleton,
} from "@/components/dashboard/TotalTasksCard";
import { TotalCustomersCard } from "@/components/dashboard/TotalCustomersCard";
import { TotalUsersCard } from "@/components/dashboard/TotalUsersCard";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";

const meta = {
  title: "components/pages/DashboardPage",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withBackgroundVariant()],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {
  render: () => (
    <DashboardPage
      TotalProjectsCardContainer={() => (
        <TotalProjectsCard totalProjects={50} />
      )}
      TotalTasksCardContainer={() => <TotalTasksCard totalTasks={500} />}
      TotalUsersCardContainer={() => <TotalUsersCard totalUsers={15} />}
      TotalCustomersCardContainer={() => (
        <TotalCustomersCard totalCustomers={20} />
      )}
      AssignedTasksContainer={() => (
        <AssignedTasks tasks={TaskListStory.args?.tasks} />
      )}
    />
  ),
};

export const Loading = {
  render: () => (
    <DashboardPage
      TotalProjectsCardContainer={() => <TotalProjectsCardSkeleton />}
      TotalTasksCardContainer={() => <TotalTasksCardSkeleton />}
      TotalUsersCardContainer={() => <TotalUsersCard />}
      TotalCustomersCardContainer={() => <TotalCustomersCard />}
      AssignedTasksContainer={() => <AssignedTasksSkeleton />}
    />
  ),
} satisfies Story;

export const WithNoTasks = {
  render: () => (
    <DashboardPage
      TotalProjectsCardContainer={() => (
        <TotalProjectsCard totalProjects={50} />
      )}
      TotalTasksCardContainer={() => <TotalTasksCard totalTasks={500} />}
      TotalUsersCardContainer={() => <TotalUsersCard totalUsers={15} />}
      TotalCustomersCardContainer={() => (
        <TotalCustomersCard totalCustomers={20} />
      )}
      AssignedTasksContainer={() => <AssignedTasksEmpty />}
    />
  ),
} satisfies Story;
