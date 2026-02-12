import { fn } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskCategoryForm } from "./NewTaskCategoryForm";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/task-categories/NewTaskCategoryForm",
  component: NewTaskCategoryForm,
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
} satisfies Meta<typeof NewTaskCategoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createTaskCategory: () => ({ status: "success" }),
  },
} satisfies Story;
