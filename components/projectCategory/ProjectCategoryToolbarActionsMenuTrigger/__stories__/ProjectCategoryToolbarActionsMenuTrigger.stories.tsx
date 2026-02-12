import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryToolbarActionsMenuTrigger } from "../ProjectCategoryToolbarActionsMenuTrigger";

const meta = {
  title:
    "components/project-categories/ProjectCategoryToolbarActionsMenuTrigger",
  component: ProjectCategoryToolbarActionsMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deleteProjectCategories: () => ({ status: "success" }),
  },
} satisfies Story;
