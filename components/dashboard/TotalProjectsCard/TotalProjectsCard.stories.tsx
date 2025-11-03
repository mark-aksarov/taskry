import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mocked } from "storybook/test";
import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "./TotalProjectsCard";
import { getTotalProjects } from "@/lib/queries/project";

const meta = {
  title: "Components/dashboard/TotalProjectsCard",
  component: TotalProjectsCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  beforeEach: () => {
    mocked(getTotalProjects).mockImplementation(
      () => new Promise((res) => res(100)),
    );
  },
} satisfies Meta<typeof TotalProjectsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <TotalProjectsCardSkeleton />,
};
