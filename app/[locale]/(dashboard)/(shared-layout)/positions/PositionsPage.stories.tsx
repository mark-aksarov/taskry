import { mocked } from "storybook/test";
import PositionsPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { PositionsPage } from "./PositionsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PositionGrid } from "@/components/position/PositionGrid";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionGridStory } from "@/components/position/PositionGrid/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreatePositionProvider } from "@/components/position/CreatePositionProvider/__stories__";
import { withDeletePositionsProvider } from "@/components/position/DeletePositionsProvider/__stories__";

const meta = {
  title: "pages/PositionsPage",
  component: PositionsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withCreatePositionProvider,
    withDeletePositionsProvider,
    withSelectedItemsProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/positions");
  },
} satisfies Meta<typeof PositionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 10,
    positionsContainer: <PositionGrid {...PositionGridStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <PositionsPageLoading />,
} satisfies Story;

export const WithNoPositionsPage = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;
