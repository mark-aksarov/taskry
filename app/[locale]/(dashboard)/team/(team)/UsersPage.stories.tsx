import { UsersPage } from "./UsersPage";
import UsersPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserListStory } from "@/components/users/UserList/UserList.stories";
import { Default as UserGridStory } from "@/components/users/UserGrid/UserGrid.stories";
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

export const Default = {
  args: {
    deleteUsersAction: fn(),
    createPositionAction: fn(),
    userFiltersFormContainer: (
      <UserFiltersForm {...UserFiltersFormStory.args} />
    ),
    usersContainer: (
      <ViewModeLayout
        list={<UserList {...UserListStory.args} showCheckbox />}
        grid={<UserGrid {...UserGridStory.args} />}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <UsersPageLoading />,
} satisfies Story;

export const WithNoUsers = {
  args: { ...Default.args },
  render: () => <UsersPageEmpty />,
} satisfies Story;
