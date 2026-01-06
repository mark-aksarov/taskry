import {
  Default as UserTasksPageLayoutDefault,
  Loading as UserTasksPageLayoutLoading,
  WithNoTasks as UserTasksPageLayoutWithNoTasks,
} from "@/components/users/UserTasksPageLayout/UserTasksPageLayout.stories";

import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";

const userId = "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI";

const meta = {
  title: "components/pages/ProfileTasksPage",
  component: UserTasksPageLayout,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/tasks");
    mocked(useParams).mockReturnValue({ id: userId });
  },
} satisfies Meta<typeof UserTasksPageLayout>;

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
