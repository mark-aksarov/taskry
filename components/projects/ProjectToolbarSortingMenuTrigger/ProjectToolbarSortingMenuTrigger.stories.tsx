import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectToolbarSortingMenuTrigger } from "./ProjectToolbarSortingMenuTrigger";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/projects/ProjectToolbarSortingMenuTrigger",
  component: ProjectToolbarSortingMenuTrigger,
  decorators: [
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedSortField: "createdAt",
  },
} satisfies Story;
