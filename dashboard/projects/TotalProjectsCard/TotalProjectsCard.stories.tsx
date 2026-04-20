import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalProjectsCard } from "./TotalProjectsCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/TotalProjectsCard",
  component: TotalProjectsCard,
  decorators: [withThemedBackground],
  args: {
    totalProjects: 50,
  },
} satisfies Meta<typeof TotalProjectsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
