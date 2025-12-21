import {
  Default as UserTasksPageLayoutDefault,
  Loading as UserTasksPageLayoutLoading,
  WithNoTasks as UserTasksPageLayoutWithNoTasks,
} from "@/components/users/UserTasksPageLayout/UserTasksPageLayout.stories";

import { mocked } from "storybook/test";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";

const userId = "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI";

const meta = {
  title: "components/pages/ProfileTasksPage",
  component: ProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskDetailCompact,
    withTaskComments,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/tasks");
    mocked(useParams).mockReturnValue({ id: userId });
  },
  args: {
    userId,
  },
} satisfies Meta<typeof ProfileTasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  ...UserTasksPageLayoutDefault,
} satisfies Story;

export const Loading = {
  ...UserTasksPageLayoutLoading,
};

export const WithNoTasks = {
  ...UserTasksPageLayoutWithNoTasks,
};
