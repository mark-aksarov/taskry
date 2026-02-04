import { fn } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewProjectCategoryForm } from "./NewProjectCategoryForm";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/project-categories/NewProjectCategoryForm",
  component: NewProjectCategoryForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <OverlayTriggerStateContext.Provider value={{ close: fn() } as any}>
        <div className="max-w-[500px]">
          <Story />
        </div>
      </OverlayTriggerStateContext.Provider>
    ),
    withThemedBackground,
  ],
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
