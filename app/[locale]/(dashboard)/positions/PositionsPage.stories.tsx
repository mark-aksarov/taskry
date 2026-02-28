import { fn, mocked } from "storybook/test";
import PositionsPageLoading from "./loading";
import { PositionsPage } from "./PositionsPage";
import PositionsTemplate from "./PositionsTemplate";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PositionsPageEmpty } from "./PositionsPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { PositionList } from "@/components/position/PositionList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { AppHeaderStory } from "@/components/layout/AppHeader/__stories__";
import { PositionListStory } from "@/components/position/PositionList/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "pages/PositionsPage",
  component: PositionsPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <PositionsTemplate {...AppHeaderStory.args}>
        <Story />
      </PositionsTemplate>
    ),
    withPageTransitionProvider,
    withSelectedItemsProvider,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/positions");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof PositionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionsContainer: <PositionList {...PositionListStory.args} />,
    createPosition: () => ({ status: "success" }),
    deletePositions: () => ({ status: "success" }),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <PositionsPageLoading />,
} satisfies Story;

export const WithNoPositionsPage = {
  args: { ...Default.args },
  render: () => (
    <PositionsPageEmpty createPosition={() => ({ status: "success" })} />
  ),
} satisfies Story;
