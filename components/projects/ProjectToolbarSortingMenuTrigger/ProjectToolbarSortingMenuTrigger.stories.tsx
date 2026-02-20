import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectToolbarSortingMenuTrigger } from "./ProjectToolbarSortingMenuTrigger";

const meta = {
  title: "components/projects/ProjectToolbarSortingMenuTrigger",
  component: ProjectToolbarSortingMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedSortField: "createdAt",
  },
} satisfies Story;
