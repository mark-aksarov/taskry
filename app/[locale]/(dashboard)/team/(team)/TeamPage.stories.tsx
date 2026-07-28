import { TeamPage } from "./TeamPage";
import { mocked } from "storybook/test";
import TeamPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UserFiltersForm } from "@/dashboard/users/UserFiltersForm";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { UserGridExample } from "@/dashboard/users/UserGrid/__stories__";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { UserPositionFiltersForm } from "@/dashboard/users/UserPositionFiltersForm";

const meta = {
  title: "pages/TeamPage",
  component: TeamPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team");
  },
} satisfies Meta<typeof TeamPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    page: 1,
    pageSize: 1,
    positionCount: 3,
    totalFilteredUsers: 3,
    filters: {},
    selectedSortField: "fullName",
    userGrid: <UserGridExample />,
    searchContainer: <SearchListExample />,
    userFiltersFormContainer: (
      <UserFiltersForm positionCheckboxGroupItems={mockedPositionSummaries} />
    ),
    userPositionFiltersFormContainer: (
      <UserPositionFiltersForm
        positionCheckboxGroupItems={mockedPositionSummaries}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <TeamPageLoading />,
} satisfies Story;

export const WithEmptyFilterResult = {
  args: { ...Default.args, totalFilteredUsers: 0 },
} satisfies Story;
