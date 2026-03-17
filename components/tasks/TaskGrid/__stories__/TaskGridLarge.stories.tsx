import { TaskGridLarge } from "../TaskGridLarge";
import { mockedTaskList } from "@/mocks/tasks";
import { TaskGridItemLarge } from "../../TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemLargeStory } from "../../TaskGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTasksProvider } from "../../DeleteTasksContext/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskGridLarge",
  component: TaskGridLarge,
  decorators: [
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withViewModeProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskGridLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        {mockedTaskList.map((task) => (
          <TaskGridItemLarge
            {...TaskGridItemLargeStory.args}
            key={task.id}
            {...task}
          />
        ))}
      </>
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
