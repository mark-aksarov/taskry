import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectToolbarActionsMenuTrigger } from "../ProjectToolbarActionsMenuTrigger";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/projects/ProjectToolbarActionsMenuTrigger",
  component: ProjectToolbarActionsMenuTrigger,
  decorators: [
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withUpdateProjectStatusesProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deleteProjects: () => ({ status: "success" }),
  },
} satisfies Story;
