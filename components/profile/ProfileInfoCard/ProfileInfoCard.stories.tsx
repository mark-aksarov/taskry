import { mocked } from "storybook/test";
import { ProfileInfo } from "../ProfileInfo";
import { usePathname } from "next/navigation";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileInfoCard } from "./ProfileInfoCard";
import { ProfileInfoSkeleton } from "../ProfileInfo";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileHeaderSkeleton } from "../ProfileHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProfileInfoStory } from "@/components/profile/ProfileInfo/ProfileInfo.stories";
import { Default as ProfileHeaderStory } from "@/components/profile/ProfileHeader/ProfileHeader.stories";
import { WithoutSomeData as ProfileInfoWithoutSomeDataStory } from "@/components/profile/ProfileInfo/ProfileInfo.stories";
import { WithoutSomeData as ProfileHeaderWithoutSomeDataStory } from "@/components/profile/ProfileHeader/ProfileHeader.stories";

const meta = {
  title: "components/profile/ProfileInfoCard",
  component: ProfileInfoCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/info");
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProfileInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ProfileInfoContainer: () => <ProfileInfo {...ProfileInfoStory.args} />,
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ProfileInfoContainer: () => <ProfileInfoSkeleton />,
    ProfileHeaderContainer: () => <ProfileHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ProfileInfoContainer: () => (
      <ProfileInfo {...ProfileInfoWithoutSomeDataStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderWithoutSomeDataStory.args} />
    ),
  },
} satisfies Story;
