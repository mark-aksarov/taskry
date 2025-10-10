import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerGridItem } from "./CustomerGridItem";
import { customersMock } from "../customersMock";

const meta = {
  title: "Components/customers/CustomerGridItem",
  component: CustomerGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[250px]">
        <Story />
      </div>
    ),
  ],
  args: {
    customer: customersMock[0],
  },
} satisfies Meta<typeof CustomerGridItem>;

export default meta;
type Story = StoryObj<typeof CustomerGridItem>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    customer: undefined,
  },
};

export const WithoutImage: Story = {
  args: {
    customer: {
      ...customersMock[0],
      imageUrl: null,
    },
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
