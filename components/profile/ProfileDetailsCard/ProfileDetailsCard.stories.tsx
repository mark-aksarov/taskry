import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileDetailsCard } from "./ProfileDetailsCard";
import { ProfileDetailsCardSkeleton } from "./ProfileDetailsCardSkeleton";
import { usersMock } from "@/lib/data/__mocks__/users";

const meta = {
  title: "components/profile/ProfileDetailsCard",
  component: ProfileDetailsCard,
  tags: ["autodocs"],
  args: {
    userPromise: new Promise((resolve) => resolve(usersMock[0])),
  },
} satisfies Meta<typeof ProfileDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;

export const Skeleton: Story = {
  render: () => <ProfileDetailsCardSkeleton />,
};

export const MobileSkeleton = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
  render: () => <ProfileDetailsCardSkeleton />,
};
