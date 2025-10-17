import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGrid } from "./TaskGrid";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { ViewModeProvider } from "@/components/common/ViewMode";

const meta = {
  title: "Components/tasks/TaskGrid",
  component: TaskGrid,
  tags: ["autodocs"],
  args: {
    tasks: tasksMock,
  },
  decorators: [
    (Story) => (
      <ViewModeProvider initialValue="grid">
        <Story />
      </ViewModeProvider>
    ),
  ],
} satisfies Meta<typeof TaskGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
