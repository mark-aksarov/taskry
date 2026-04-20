import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withDeleteTasksProvider } from "../../DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { TasksContainerPresentationExample } from "./TasksContainerPresentationExample";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesProvider/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TasksContainer",
  component: TasksContainerPresentationExample,
  decorators: [
    withUpdateTaskStatusesProvider,
    withDeleteTasksProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withModalManagerProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TasksContainerPresentationExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <PageGrid>
      <TasksContainerPresentationExample />
    </PageGrid>
  ),
} satisfies Story;
