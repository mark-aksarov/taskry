import { mockedTaskList } from "@/mocks/tasks";
import { TaskGridMobile } from "../TaskGridMobile";
import { TaskGridItemMobile } from "../../TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemMobileStory } from "../../TaskGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTasksProvider } from "../../DeleteTasksContext/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskGridMobile",
  component: TaskGridMobile,
  decorators: [
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withViewModeProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof TaskGridMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedTaskList.map((task) => (
      <TaskGridItemMobile
        {...TaskGridItemMobileStory.args}
        key={task.id}
        {...task}
      />
    )),
  },
} satisfies Story;
