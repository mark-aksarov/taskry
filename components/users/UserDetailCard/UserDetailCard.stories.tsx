import { mocked } from "storybook/test";
import { UserDetail } from "../UserDetail";
import { UserHeader } from "../UserHeader";
import { usePathname } from "next/navigation";
import { UserDetailCard } from "./UserDetailCard";
import { UserDetailSkeleton } from "../UserDetail";
import { UserHeaderSkeleton } from "../UserHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserNavigationDesktop } from "../UserNavigationDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserDetailStory } from "@/components/users/UserDetail/UserDetail.stories";
import { Default as UserHeaderStory } from "@/components/users/UserHeader/UserHeader.stories";
import { WithoutSomeData as UserDetailWithoutSomeDataStory } from "@/components/users/UserDetail/UserDetail.stories";
import { WithoutSomeData as UserHeaderWithoutSomeDataStory } from "@/components/users/UserHeader/UserHeader.stories";

const meta = {
  title: "components/users/UserDetailCard",
  component: UserDetailCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/info");
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    profileDetail: <UserDetail {...UserDetailStory.args} />,
    profileHeader: <UserHeader {...UserHeaderStory.args} />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;

export const Loading = {
  args: {
    profileDetail: <UserDetailSkeleton />,
    profileHeader: <UserHeaderSkeleton />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    profileDetail: <UserDetail {...UserDetailWithoutSomeDataStory.args} />,
    profileHeader: <UserHeader {...UserHeaderWithoutSomeDataStory.args} />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;
