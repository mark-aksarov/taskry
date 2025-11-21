import { mocked } from "storybook/test";
import { useParams, usePathname } from "next/navigation";
import ProfileTasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProfileTasksPage } from "@/app/(dashboard)/profile/tasks/ProfileTasksPage";
import { UserProfileNavigationMobile } from "@/components/users/UserProfileNavigationMobile";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { ProfileTasksPageEmpty } from "@/app/(dashboard)/profile/tasks/ProfileTasksPageEmpty";
import { UserProfileNavigationDesktop } from "@/components/users/UserProfileNavigationDesktop";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";
import { Default as ProfileTasksPageStory } from "@/app/(dashboard)/profile/tasks/ProfileTasksPage.stories";

const meta = {
  title: "components/pages/TeamProfileTasksPage",
  component: ProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskDetailCompact,
    withTaskComments,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(
      "/team/BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI/tasks",
    );
    mocked(useParams).mockReturnValue({
      id: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    });
  },
} satisfies Meta<typeof ProfileTasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  ...ProfileTasksPageStory,
  args: {
    ...ProfileTasksPageStory.args,
    profileNavigationDesktop: <UserProfileNavigationDesktop />,
    profileNavigationMobile: <UserProfileNavigationMobile />,
  },
} satisfies Story;

export const Loading = {
  render: () => <ProfileTasksPageLoading />,
};

export const WithNoTasks = {
  render: () => <ProfileTasksPageEmpty {...Default.args} />,
};
