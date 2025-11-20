import { mocked } from "storybook/test";
import { ProfileDetail } from "../ProfileDetail";
import { usePathname } from "next/navigation";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileDetailCard } from "./ProfileDetailCard";
import { ProfileDetailSkeleton } from "../ProfileDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileHeaderSkeleton } from "../ProfileHeader";
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
    ProfileDetailContainer: () => (
      <ProfileDetail {...ProfileDetailStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ProfileDetailContainer: () => <ProfileDetailSkeleton />,
    ProfileHeaderContainer: () => <ProfileHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ProfileDetailContainer: () => (
      <ProfileDetail {...ProfileDetailWithoutSomeDataStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderWithoutSomeDataStory.args} />
    ),
  },
} satisfies Story;
