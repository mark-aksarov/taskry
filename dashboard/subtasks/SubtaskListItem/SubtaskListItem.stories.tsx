import { SubtaskListItem } from "../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteSubtaskProvider } from "../DeleteSubtaskContext";
import { CreateSubtaskProvider } from "../CreateSubtaskContext";
import { UpdateSubtaskProvider } from "../UpdateSubtaskContext";
import { ToggleSubtaskProvider } from "../ToggleSubtaskContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { DeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskContext";

const meta = {
  title: "dashboard/subtasks/SubtaskListItem",
  component: SubtaskListItem,
  decorators: [
    (Story) => (
      <DeleteTaskProvider>
        <CreateSubtaskProvider>
          <UpdateSubtaskProvider>
            <DeleteSubtaskProvider>
              <ToggleSubtaskProvider>
                <Story />
              </ToggleSubtaskProvider>
            </DeleteSubtaskProvider>
          </UpdateSubtaskProvider>
        </CreateSubtaskProvider>
      </DeleteTaskProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    id: 1,
    text: "Subtask placeholder text 1",
  },
} satisfies Meta<typeof SubtaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutActionMenu = {
  args: {
    isDone: false,
    showActionMenu: false,
  },
} satisfies Story;

export const Plain = {
  args: {
    isDone: false,
  },
} satisfies Story;

export const PlainIsDone = {
  args: {
    isDone: true,
  },
} satisfies Story;

export const Rich = {
  args: {
    variant: "rich",
    isDone: false,
  },
} satisfies Story;

export const RichIsDone = {
  args: {
    variant: "rich",
    isDone: true,
  },
} satisfies Story;
