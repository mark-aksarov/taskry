import { mocked } from "storybook/test";
import PositionsPageLoading from "./loading";
import { usePathname } from "next/navigation";
import { PositionsPage } from "./PositionsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { SearchList } from "@/components/search/SearchList";
import { PositionList } from "@/components/position/PositionList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { PositionListStory } from "@/components/position/PositionList/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withCreatePositionProvider } from "@/components/position/CreatePositionProvider/__stories__";
import { withDeletePositionsProvider } from "@/components/position/DeletePositionsProvider/__stories__";
import { withCreatePositionModalProvider } from "@/components/position/CreatePositionModal/__stories__";

const meta = {
  title: "pages/PositionsPage",
  component: PositionsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    // preserve provider order as in page.tsx file
    withCreatePositionProvider,
    withCreatePositionModalProvider,
    withDeletePositionsProvider,
    withSelectedItemsProvider,

    PageDecorator, // most providers and layout are defined in PageDecorator
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
    searchContainer: <SearchList {...SearchListStory.args} />,
    positionsContainer: <PositionList {...PositionListStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <PositionsPageLoading />,
} satisfies Story;

export const WithNoPositionsPage = {
  args: { ...Default.args, totalCount: 0 },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
