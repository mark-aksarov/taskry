import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserGridItem } from "./UserGridItem";
import { usersMock } from "../usersMock";

const meta = {
  title: "Components/users/UserGridItem",
  component: UserGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[250px]">
        <Story />
      </div>
    ),
  ],
  args: {
    user: usersMock[0],
  },
} satisfies Meta<typeof UserGridItem>;

export default meta;
type Story = StoryObj<typeof UserGridItem>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    user: undefined,
  },
};

export const WithoutImage: Story = {
  args: {
    user: {
      ...usersMock[0],
      imageUrl: null,
    },
  },
};

export const WithoutPosition: Story = {
  args: {
    user: {
      ...usersMock[0],
      position: null,
    },
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
