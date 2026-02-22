import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { ProjectCategoryToolbarActionsMenuTrigger } from "../ProjectCategoryToolbarActionsMenuTrigger";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title:
    "components/project-categories/ProjectCategoryToolbarActionsMenuTrigger",
  component: ProjectCategoryToolbarActionsMenuTrigger,
  decorators: [
    withPageTransitionProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCategoryToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deleteProjectCategories: () => ({ status: "success" }),
  },
} satisfies Story;
