import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryList } from "../TaskCategoryList";
import { TaskCategoryListItem } from "../../TaskCategoryListItem";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryListItemStory } from "../../TaskCategoryListItem/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { MockedUpdateTaskCategoryProvider } from "../../UpdateTaskCategoryProvider/__stories__";
import { MockedDeleteTaskCategoryProvider } from "../../DeleteTaskCategoryProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteTaskCategoriesProvider } from "../../DeleteTaskCategoriesProvider/__stories__";

const meta = {
  title: "components/task-categories/TaskCategoryList",
  component: TaskCategoryList,
  decorators: [
    withDeleteTaskCategoriesProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedTaskCategorySummaries.map((taskCategory) => (
      <MockedUpdateTaskCategoryProvider key={taskCategory.id}>
        <MockedDeleteTaskCategoryProvider>
          <TaskCategoryListItem
            {...TaskCategoryListItemStory.args}
            {...taskCategory}
          />
        </MockedDeleteTaskCategoryProvider>
      </MockedUpdateTaskCategoryProvider>
    )),
  },
} satisfies Story;
