import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditProjectCategoryForm } from "../EditProjectCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/project-categories/EditProjectCategoryForm",
  component: EditProjectCategoryForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditProjectCategoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    nameDefaultValue: "Web Development",
    updateProjectCategory: () => ({ status: "success" }),
  },
} satisfies Story;
