import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryListItem } from "../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/project-categories/ProjectCategoryListItem",
  component: ProjectCategoryListItem,
  decorators: [withSelectedItemsProvider, withThemedBackground],
} satisfies Meta<typeof ProjectCategoryListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Project Category 1",
    updateProjectCategory: () => ({ status: "success" }),
    deleteProjectCategory: () => ({ status: "success" }),
  },
} satisfies Story;
