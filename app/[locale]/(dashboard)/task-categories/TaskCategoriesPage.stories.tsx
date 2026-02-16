import { fn, mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { TaskCategoriesPageEmpty } from "./TaskCategoriesPageEmpty";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryList } from "@/components/taskCategory/TaskCategoryList";
import { TaskCategoryListStory } from "@/components/taskCategory/TaskCategoryList/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteTaskCategoryModalProvider } from "@/components/taskCategory/DeleteTaskCategoryModal/__stories__";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";
import { TaskCategoryToolbarCreateNewModalTrigger } from "@/components/taskCategory/TaskCategoryToolbarCreateNewModalTrigger";
import { TaskCategoryToolbarActionsMenuTriggerStory } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger/__stories__";
import { TaskCategoryToolbarCreateNewModalTriggerStory } from "@/components/taskCategory/TaskCategoryToolbarCreateNewModalTrigger/__stories__";

const meta = {
  title: "pages/TaskCategoriesPage",
  component: TaskCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withDeleteTaskCategoryModalProvider,
    withSelectedItemsProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/task-categories");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof TaskCategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const taskCategoryToolbarCreateNewModalTrigger = (
  <TaskCategoryToolbarCreateNewModalTrigger
    {...TaskCategoryToolbarCreateNewModalTriggerStory.args}
  />
);

export const Default = {
  args: {
    taskCategoriesContainer: (
      <TaskCategoryList {...TaskCategoryListStory.args} />
    ),
    taskCategoryToolbarCreateNewModalTrigger:
      taskCategoryToolbarCreateNewModalTrigger,
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
      taskCategoryToolbarCreateNewModalTrigger={
        taskCategoryToolbarCreateNewModalTrigger
      }
    />
  ),
} satisfies Story;
