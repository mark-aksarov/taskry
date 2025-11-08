import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileInfoCard } from "./ProfileInfoCard";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { ProfileInfo } from "../ProfileInfo";
import { ProfileHeader } from "../ProfileHeader";
import { Default as ProfileHeaderStory } from "@/components/profile/ProfileHeader/ProfileHeader.stories";
import { Default as ProfileInfoStory } from "@/components/profile/ProfileInfo/ProfileInfo.stories";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "components/profile/ProfileInfoCard",
  component: ProfileInfoCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/info");
  },
  decorators: [withBackgroundVariant()],
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
    ProfileInfoContainer: () => <ProfileInfo />,
    ProfileHeaderContainer: () => <ProfileHeader />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ProfileInfoContainer: () => (
      <ProfileInfo
        {...ProfileInfoStory.args}
        user={{
          ...ProfileInfoStory.args.user,
          publicLink: null,
          phoneNumber: null,
          position: null,
          birthdate: null,
          address: null,
          bio: null,
        }}
      />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader
        {...ProfileHeaderStory.args}
        user={{
          ...ProfileHeaderStory.args.user,
          imageUrl: null,
          position: null,
        }}
      />
    ),
  },
} satisfies Story;
