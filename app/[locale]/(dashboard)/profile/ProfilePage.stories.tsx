import {
  Default as UserDetailStory,
  WithoutSomeData as UserDetailWithoutSomeDataStory,
} from "@/components/users/UserDetail/UserDetail.stories";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { mocked } from "storybook/test";
import { ProfilePage } from "./ProfilePage";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

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
    userHeaderContainer: (
      <DetailHeader
        title={UserDetailStory.args.fullName}
        image={<PersonDetailHeaderImage imageUrl="/man.jpg" alt="John Doe" />}
        subtitle={UserDetailStory.args.position?.name}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    profileDetailContainer: <UserDetailSkeleton />,
    userHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    profileDetailContainer: (
      <UserDetail {...UserDetailWithoutSomeDataStory.args} />
    ),
    userHeaderContainer: (
      <DetailHeader
        title={UserDetailStory.args.fullName}
        image={<PersonDetailHeaderImage />}
        subtitle={UserDetailStory.args.position?.name}
      />
    ),
  },
} satisfies Story;
