import PositionsPageLoading from "./loading";
import { fn, mocked } from "storybook/test";
import { PositionsPage } from "./PositionsPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname, useRouter } from "next/navigation";
import { PositionsPageEmpty } from "./PositionsPageEmpty";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { PositionList } from "@/components/position/PositionList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionToolbarCreateNewButton } from "@/components/position/PositionToolbarCreateNewButton";
import { Default as PositionListStory } from "@/components/position/PositionList/PositionList.stories";
import { PositionToolbarActionsMenuTrigger } from "@/components/position/PositionToolbarActionsMenuTrigger";
import { PositionToolbarCreateNewButtonStory } from "@/components/position/PositionToolbarCreateNewButton/__stories__";
import { PositionToolbarActionsMenuTriggerStory } from "@/components/position/PositionToolbarActionsMenuTrigger/__stories__";

const meta = {
  title: "components/pages/PositionsPage",
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

const positionToolbarCreateNewButton = (
  <PositionToolbarCreateNewButton
    {...PositionToolbarCreateNewButtonStory.args}
  />
);

export const Default = {
  args: {
    positionsContainer: <PositionList {...PositionListStory.args} />,
    positionToolbarCreateNewButton: positionToolbarCreateNewButton,
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
      positionToolbarCreateNewButton={positionToolbarCreateNewButton}
    />
  ),
} satisfies Story;
