import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ActiveProjectsCard,
  ActiveProjectsCardSkeleton,
} from "./ActiveProjectsCard";
import { mocked } from "storybook/test";
import { getActiveProjects, getTotalProjects } from "@/lib/queries/project";

const meta = {
  title: "Components/dashboard/ActiveProjectsCard",
  component: ActiveProjectsCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  beforeEach: () => {
    const activeProjects = 10;
    let lastTotalProjects = 100;

    mocked(getActiveProjects).mockReturnValue(
      new Promise((res) => res(activeProjects)),
    );
    mocked(getTotalProjects).mockImplementation(
      () =>
        new Promise((res) =>
          res((lastTotalProjects -= lastTotalProjects * 0.1)),
        ),
    );
  },
} satisfies Meta<typeof ActiveProjectsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <ActiveProjectsCardSkeleton />,
};
