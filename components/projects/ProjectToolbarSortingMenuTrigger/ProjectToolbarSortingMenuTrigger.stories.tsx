import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectToolbarSortingMenuTrigger } from "./ProjectToolbarSortingMenuTrigger";

const meta = {
  title: "Components/projects/ProjectToolbarSortingMenuTrigger",
  component: ProjectToolbarSortingMenuTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
