import { fn, mocked } from "storybook/test";
import TasksPageLoading from "./loading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { PageDecorator } from "@/.storybook/PageDecorator";
import TaskCategoriesTemplate from "./TaskCategoriesTemplate";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { TaskCategoryList } from "@/components/taskCategory/TaskCategoryList";
import { TaskCategoryListStory } from "@/components/taskCategory/TaskCategoryList/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

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
    totalCount: 10,
    taskCategoriesContainer: (
      <TaskCategoryList {...TaskCategoryListStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TasksPageLoading />,
} satisfies Story;

export const WithNoTaskCategories = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
