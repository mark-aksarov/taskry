import { usePathname } from "next/navigation";
import { mocked } from "storybook/internal/test";
import { ProfileActions } from "../ProfileActions";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserNavigationDesktop } from "./UserNavigationDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProfileActionsStory } from "../ProfileActions/ProfileActions.stories";

const meta = {
  title: "components/users/UserNavigationDesktop",
  component: UserNavigationDesktop,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserNavigationDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userActions: <ProfileActions {...ProfileActionsStory.args} />,
  },
} satisfies Story;
