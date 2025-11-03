import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mocked } from "storybook/test";
import {
  TotalCustomersCard,
  TotalCustomersCardSkeleton,
} from "./TotalCustomersCard";
import { getTotalCustomers } from "@/lib/queries/customers";

const meta = {
  title: "Components/dashboard/TotalCustomersCard",
  component: TotalCustomersCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  beforeEach: () => {
    mocked(getTotalCustomers).mockImplementation(
      () => new Promise((res) => res(15)),
    );
  },
} satisfies Meta<typeof TotalCustomersCard>;

export default meta;
type Story = StoryObj<typeof TotalCustomersCard>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <TotalCustomersCardSkeleton />,
};
