import {
  PersonHeader,
  PersonHeaderSkeleton,
} from "@/components/common/PersonHeader";

import {
  Default as PersonHeaderStory,
  WithoutImageUrl as PersonHeaderWithoutImageUrlStory,
} from "@/components/common/PersonHeader/PersonHeader.stories";

import {
  Default as UserDetailStory,
  WithoutSomeData as UserDetailWithoutSomeDataStory,
} from "@/components/users/UserDetail/UserDetail.stories";

import { mocked } from "storybook/test";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";

const userId = "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI";

const meta = {
  title: "components/pages/ProfilePage",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
  },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    profileDetailContainer: <UserDetail {...UserDetailStory.args} />,
    userHeaderContainer: <PersonHeader {...PersonHeaderStory.args} />,
  },
} satisfies Story;

export const Loading: Story = {
  args: {
    profileDetailContainer: <UserDetailSkeleton />,
    userHeaderContainer: <PersonHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData: Story = {
  args: {
    profileDetailContainer: (
      <UserDetail {...UserDetailWithoutSomeDataStory.args} />
    ),
    userHeaderContainer: (
      <PersonHeader {...PersonHeaderWithoutImageUrlStory.args} />
    ),
  },
} satisfies Story;
