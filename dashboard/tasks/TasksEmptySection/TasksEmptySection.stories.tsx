import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TasksEmptySection } from "./TasksEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskProvider } from "../CreateTaskProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/tasks/TasksEmptySection",
  component: TasksEmptySection,
  decorators: [
    withCreateTaskProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: { layout: "centered" },
} satisfies Meta<typeof TasksEmptySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
