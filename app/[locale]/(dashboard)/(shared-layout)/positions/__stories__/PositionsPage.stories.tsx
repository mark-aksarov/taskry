import { mocked } from "storybook/test";
import PositionsPageLoading from "../loading";
import { usePathname } from "next/navigation";
import { PositionsPage } from "../PositionsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchList } from "@/components/search/SearchList";
import { PositionList } from "@/components/position/PositionList";
import { PositionsPageDecorator } from "./PositionsPageDecorator";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { PositionListStory } from "@/components/position/PositionList/__stories__";

const meta = {
  title: "pages/PositionsPage",
  component: PositionsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    PositionsPageDecorator,
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
