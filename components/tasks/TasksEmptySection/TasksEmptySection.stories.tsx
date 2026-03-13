import { NewTaskForm } from "../NewTaskForm";
import { NewTaskModal } from "../NewTaskModal";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TasksEmptySection } from "./TasksEmptySection";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskProvider } from "../CreateTaskContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";

const meta = {
  title: "components/tasks/TasksEmptySection",
  component: TasksEmptySection,
  decorators: [
    (Story) => (
      <>
        <Story />
        <NewTaskModal
          newTaskFormContainer={
            <NewTaskForm
              forcedAssigneeId="user-3"
              categorySelectItems={mockedTaskCategorySummaries}
              projectSelectItems={mockedProjectSummaries}
              assigneeSelectItems={mockedUserSummaries}
            />
          }
        />
      </>
    ),
    withCreateTaskProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
  parameters: { layout: "centered" },
} satisfies Meta<typeof TasksEmptySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
