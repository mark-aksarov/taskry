import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalCustomersCard } from "./TotalCustomersCard";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/dashboard/TotalCustomersCard",
  component: TotalCustomersCard,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant()],
  args: {
    totalCustomers: 20,
  },
} satisfies Meta<typeof TotalCustomersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
