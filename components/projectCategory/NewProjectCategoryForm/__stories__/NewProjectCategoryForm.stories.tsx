import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewProjectCategoryForm } from "../NewProjectCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/project-categories/NewProjectCategoryForm",
  component: NewProjectCategoryForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewProjectCategoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createProjectCategory: () => ({ status: "success" }),
  },
} satisfies Story;
