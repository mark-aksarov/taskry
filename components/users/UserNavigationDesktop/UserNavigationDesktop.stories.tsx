import { mocked } from "storybook/internal/test";
import { ProfileActions } from "../ProfileActions";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { UserNavigationDesktop } from "./UserNavigationDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProfileActionsStory } from "../ProfileActions/__stories__/ProfileActions.stories";

const meta = {
  title: "components/users/UserNavigationDesktop",
  component: UserNavigationDesktop,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
    mocked(useParams).mockReturnValue({
      id: "user-1",
    });
  },
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserNavigationDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userActions: <ProfileActions {...ProfileActionsStory.args} />,
  },
} satisfies Story;
