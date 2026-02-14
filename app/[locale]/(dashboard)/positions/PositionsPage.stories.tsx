import PositionsPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { PositionsPage } from "./PositionsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PositionsPageEmpty } from "./PositionsPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { PositionList } from "@/components/position/PositionList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionListStory } from "@/components/position/PositionList/__stories__";
import { PositionToolbarCreateNewModalTrigger } from "@/components/position/PositionToolbarCreateNewModalTrigger";
import { PositionToolbarActionsMenuTrigger } from "@/components/position/PositionToolbarActionsMenuTrigger";
import { PositionToolbarCreateNewModalTriggerStory } from "@/components/position/PositionToolbarCreateNewModalTrigger/__stories__";
import { PositionToolbarActionsMenuTriggerStory } from "@/components/position/PositionToolbarActionsMenuTrigger/__stories__";

const meta = {
  title: "pages/PositionsPage",
  component: PositionsPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/positions");
    mocked(useRouter).mockReturnValue({ push: fn() } as any);
  },
} satisfies Meta<typeof PositionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const positionToolbarCreateNewModalTrigger = (
  <PositionToolbarCreateNewModalTrigger
    {...PositionToolbarCreateNewModalTriggerStory.args}
  />
);

export const Default = {
  args: {
    positionsContainer: <PositionList {...PositionListStory.args} />,
    positionToolbarCreateNewModalTrigger: positionToolbarCreateNewModalTrigger,
    positionToolbarActionsMenuTrigger: (
      <PositionToolbarActionsMenuTrigger
        {...PositionToolbarActionsMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <PositionsPageLoading />,
} satisfies Story;

export const WithNoPositionsPage = {
  args: { ...Default.args },
  render: () => (
    <PositionsPageEmpty
      positionToolbarCreateNewModalTrigger={
        positionToolbarCreateNewModalTrigger
      }
    />
  ),
} satisfies Story;
