import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCard } from "./TotalProjectsCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/dashboard/TotalProjectsCard",
  component: TotalProjectsCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  args: {
    totalProjects: 50,
  },
} satisfies Meta<typeof TotalProjectsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
