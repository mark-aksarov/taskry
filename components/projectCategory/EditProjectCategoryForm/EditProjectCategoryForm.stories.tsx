import { fn } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { EditProjectCategoryForm } from "./EditProjectCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/project-categories/EditProjectCategoryForm",
  component: EditProjectCategoryForm,
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
