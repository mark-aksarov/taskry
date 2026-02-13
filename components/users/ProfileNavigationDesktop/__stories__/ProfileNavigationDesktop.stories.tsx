import { usePathname } from "next/navigation";
import { mocked } from "storybook/internal/test";
import { ProfileActions } from "../../ProfileActions";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileActionsStory } from "../../ProfileActions/__stories__";
import { ProfileNavigationDesktop } from "../ProfileNavigationDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/ProfileNavigationDesktop",
  component: ProfileNavigationDesktop,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
  },
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProfileNavigationDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    profileActions: <ProfileActions {...ProfileActionsStory.args} />,
  },
} satisfies Story;
