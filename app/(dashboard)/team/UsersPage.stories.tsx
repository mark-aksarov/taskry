import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UsersPage } from "./UsersPage";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { default as UserPageLoading } from "./loading";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";
import { Default as UserListStory } from "@/components/users/UserList/UserList.stories";
import { Default as UserGridStory } from "@/components/users/UserGrid/UserGrid.stories";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { Default as UserFiltersFormStory } from "@/components/users/UserFiltersForm/UserFiltersForm.stories";

const meta = {
  title: "components/pages/UsersPage",
  component: UsersPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
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
    UserViewModeContainer: () => (
      <ViewModeContainer
        list={<UserList {...UserListStory.args} />}
        grid={<UserGrid {...UserGridStory.args} />}
      />
    ),
  },
};

export const Loading: Story = {
  args: { ...Default.args },
  render: () => <UserPageLoading />,
};

export const WithNoUsers: Story = {
  args: { ...Default.args },
  render: () => <UsersPageEmpty />,
};
