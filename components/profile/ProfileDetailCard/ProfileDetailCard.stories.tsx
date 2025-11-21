import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { ProfileDetail } from "../ProfileDetail";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileDetailCard } from "./ProfileDetailCard";
import { ProfileDetailSkeleton } from "../ProfileDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileHeaderSkeleton } from "../ProfileHeader";
import { ProfileNavigationDesktop } from "../ProfileNavigationDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProfileDetailStory } from "@/components/profile/ProfileDetail/ProfileDetail.stories";
import { Default as ProfileHeaderStory } from "@/components/profile/ProfileHeader/ProfileHeader.stories";
import { WithoutSomeData as ProfileDetailWithoutSomeDataStory } from "@/components/profile/ProfileDetail/ProfileDetail.stories";
import { WithoutSomeData as ProfileHeaderWithoutSomeDataStory } from "@/components/profile/ProfileHeader/ProfileHeader.stories";

const meta = {
  title: "components/profile/ProfileDetailCard",
  component: ProfileDetailCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/info");
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProfileDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    profileDetail: <ProfileDetail {...ProfileDetailStory.args} />,
    profileHeader: <ProfileHeader {...ProfileHeaderStory.args} />,
    profileNavigationDesktop: <ProfileNavigationDesktop />,
  },
} satisfies Story;

export const Loading = {
  args: {
    profileDetail: <ProfileDetailSkeleton />,
    profileHeader: <ProfileHeaderSkeleton />,
    profileNavigationDesktop: <ProfileNavigationDesktop />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    profileDetail: (
      <ProfileDetail {...ProfileDetailWithoutSomeDataStory.args} />
    ),
    profileHeader: (
      <ProfileHeader {...ProfileHeaderWithoutSomeDataStory.args} />
    ),
    profileNavigationDesktop: <ProfileNavigationDesktop />,
  },
} satisfies Story;
