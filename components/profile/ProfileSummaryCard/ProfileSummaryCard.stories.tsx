import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mocked } from "storybook/test";
import { getUserById } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import {
  ProfileSummaryCard,
  ProfileSummaryCardSkeleton,
} from "./ProfileSummaryCard";

const meta = {
  title: "components/profile/ProfileSummaryCard",
  component: ProfileSummaryCard,
  tags: ["autodocs"],
  beforeEach: () => {
    mocked(getUserById).mockReturnValue(
      new Promise((res) => res(usersMock[0])),
    );
  },
} satisfies Meta<typeof ProfileSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;

export const Skeleton: Story = {
  render: () => <ProfileSummaryCardSkeleton />,
};

export const MobileSkeleton = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
  render: () => <ProfileSummaryCardSkeleton />,
};
