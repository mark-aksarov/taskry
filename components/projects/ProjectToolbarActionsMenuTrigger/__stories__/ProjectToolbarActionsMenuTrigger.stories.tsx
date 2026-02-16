import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectToolbarActionsMenuTrigger } from "../ProjectToolbarActionsMenuTrigger";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";

const meta = {
  title: "components/projects/ProjectToolbarActionsMenuTrigger",
  component: ProjectToolbarActionsMenuTrigger,
  decorators: [withSelectedProjectsProvider, withThemedBackground],
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
    updateStatusAction: () => ({ status: "success" }),
  },
} satisfies Story;
