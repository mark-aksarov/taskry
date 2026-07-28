import { mocked } from "storybook/test";
import PositionsPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { PositionsPage } from "./PositionsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { PositionGridExample } from "@/dashboard/position/PositionGrid/__stories__";

const meta = {
  title: "pages/PositionsPage",
  component: PositionsPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/positions");
  },
} satisfies Meta<typeof PositionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    selectedItems: [{ id: 1 }, { id: 2 }, { id: 3 }],
    positionsContainer: <PositionGridExample />,
    searchContainer: <SearchListExample />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <PositionsPageLoading />,
} satisfies Story;

export const WithNoPositionsPage = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
