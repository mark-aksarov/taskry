import { fn, mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { PageDecorator } from "@/.storybook/PageDecorator";
import TaskCategoriesTemplate from "./TaskCategoriesTemplate";
import { TaskCategoriesPageEmpty } from "./TaskCategoriesPageEmpty";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { TaskCategoryList } from "@/components/taskCategory/TaskCategoryList";
import { TaskCategoryListStory } from "@/components/taskCategory/TaskCategoryList/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withDeleteTaskCategoryModalProvider } from "@/components/taskCategory/DeleteTaskCategoryModal/__stories__";

const meta = {
  title: "pages/TaskCategoriesPage",
  component: TaskCategoriesPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <TaskCategoriesTemplate {...AppHeaderStory.args}>
        <Story />
      </TaskCategoriesTemplate>
    ),
    withPageTransitionProvider,
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

export const Default = {
  args: {
    taskCategoriesContainer: (
      <TaskCategoryList {...TaskCategoryListStory.args} />
    ),
    guestMode: false,
    createTaskCategory: () => ({ status: "success" }),
    deleteTaskCategories: () => ({ status: "success" }),
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
      guestMode={false}
      createTaskCategory={() => ({ status: "success" })}
    />
  ),
} satisfies Story;
