import {
  Default as UserDetailStory,
  WithoutSomeData as UserDetailWithoutSomeDataStory,
} from "@/components/users/UserDetail/UserDetail.stories";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { mocked } from "storybook/test";
import { TeamProfilePage } from "./TeamProfilePage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserDetail, UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";

const userId = "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI";

const meta = {
  title: "components/pages/TeamProfilePage",
  component: TeamProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(`/team/${userId}`);
    mocked(useParams).mockReturnValue({
      id: userId,
    });
  },
} satisfies Meta<typeof TeamProfilePage>;

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
