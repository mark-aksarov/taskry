import { fn, mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoriesPageEmpty } from "./TaskCategoriesPageEmpty";
import { TaskCategoryList } from "@/components/taskCategory/TaskCategoryList";
import { TaskCategoryToolbarCreateNewButton } from "@/components/taskCategory/TaskCategoryToolbarCreateNewButton";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";
import { Default as TaskCategoryListStory } from "@/components/taskCategory/TaskCategoryList/TaskCategoryList.stories";
import { TaskCategoryToolbarCreateNewButtonStory } from "@/components/taskCategory/TaskCategoryToolbarCreateNewButton/__stories__";
import { TaskCategoryToolbarActionsMenuTriggerStory } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger/__stories__";

const meta = {
  title: "components/pages/TaskCategoriesPage",
  component: TaskCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/task-categories");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof TaskCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const taskCategoryToolbarCreateNewButton = (
  <TaskCategoryToolbarCreateNewButton
    {...TaskCategoryToolbarCreateNewButtonStory.args}
  />
);

export const Default = {
  args: {
    taskCategoriesContainer: (
      <TaskCategoryList {...TaskCategoryListStory.args} />
    ),
    taskCategoryToolbarCreateNewButton: taskCategoryToolbarCreateNewButton,
    taskCategoryToolbarActionsMenuTrigger: (
      <TaskCategoryToolbarActionsMenuTrigger
        {...TaskCategoryToolbarActionsMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTaskCategories = {
  args: { ...Default.args },
  render: () => (
    <TaskCategoriesPageEmpty
      taskCategoryToolbarCreateNewButton={taskCategoryToolbarCreateNewButton}
    />
  ),
} satisfies Story;
