import {
  PersonHeader,
  PersonHeaderSkeleton,
} from "@/components/common/PersonHeader";

import { mocked } from "storybook/test";
import { UserDetail } from "../UserDetail";
import { UserDetailCard } from "./UserDetailCard";
import { UserDetailSkeleton } from "../UserDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { UserNavigationDesktop } from "../UserNavigationDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserDetailStory } from "@/components/users/UserDetail/UserDetail.stories";
import { Default as PersonHeaderStory } from "@/components/common/PersonHeader/PersonHeader.stories";
import { WithoutSomeData as UserDetailWithoutSomeDataStory } from "@/components/users/UserDetail/UserDetail.stories";
import { WithoutImageUrl as PersonHeaderWithoutImageUrlStory } from "@/components/common/PersonHeader/PersonHeader.stories";

const meta = {
  title: "components/users/UserDetailCard",
  component: UserDetailCard,
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/info");
    mocked(useParams).mockReturnValue({
      id: "user-1",
    });
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    profileDetail: <UserDetail {...UserDetailStory.args} />,
    profileHeader: <PersonHeader {...PersonHeaderStory.args} />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;

export const Loading = {
  args: {
    profileDetail: <UserDetailSkeleton />,
    profileHeader: <PersonHeaderSkeleton />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    profileDetail: <UserDetail {...UserDetailWithoutSomeDataStory.args} />,
    profileHeader: <PersonHeader {...PersonHeaderWithoutImageUrlStory.args} />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;
