import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { mocked } from "storybook/test";
import { UserDetail } from "../UserDetail";
import { UserDetailCard } from "./UserDetailCard";
import { UserDetailSkeleton } from "../UserDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { UserNavigationDesktop } from "../UserNavigationDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetailStory } from "@/components/users/UserDetail/__stories__";
import { PersonDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { UserDetailWithoutSomeDataStory } from "@/components/users/UserDetail/__stories__";

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
    profileHeader: <DetailHeader {...PersonDetailHeaderStory.args} />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;

export const Loading = {
  args: {
    profileDetail: <UserDetailSkeleton />,
    profileHeader: <DetailHeaderSkeleton />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    profileDetail: <UserDetail {...UserDetailWithoutSomeDataStory.args} />,
    profileHeader: <DetailHeader {...PersonDetailHeaderStory.args} />,
    navigationDesktop: <UserNavigationDesktop />,
  },
} satisfies Story;
