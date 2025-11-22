import { UsersPage } from "./UsersPage";
import { mocked } from "storybook/test";
import UsersPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserListStory } from "@/components/users/UserList/UserList.stories";
import { Default as UserGridStory } from "@/components/users/UserGrid/UserGrid.stories";
import { withUserDetail } from "@/components/users/UserDetailClientContainer/decorators";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { Default as UserFiltersFormStory } from "@/components/users/UserFiltersForm/UserFiltersForm.stories";
import { Default as NewProjectFormStory } from "@/components/projects/NewProjectForm/NewProjectForm.stories";

const meta = {
  title: "components/pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [withUserDetail, PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
  },
} satisfies Meta<typeof UsersPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    UserFiltersFormContainer: () => (
      <UserFiltersForm {...UserFiltersFormStory.args} />
    ),
    NewTaskFormContainer: () => <NewTaskForm {...TaskFormBaseStory.args} />,
    NewProjectFormContainer: () => (
      <NewProjectForm {...NewProjectFormStory.args} />
    ),
    UsersServerContainer: () => (
      <ViewModeLayout
        list={<UserList {...UserListStory.args} />}
        grid={<UserGrid {...UserGridStory.args} />}
      />
    ),
  },
};

export const Loading: Story = {
  args: { ...Default.args },
  render: () => <UsersPageLoading />,
};

export const WithNoUsers: Story = {
  args: { ...Default.args },
  render: () => <UsersPageEmpty />,
};
