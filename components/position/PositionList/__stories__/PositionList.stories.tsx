import { PositionList } from "../PositionList";
import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "../../PositionListItem";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UpdatePositionModalProvider } from "../../UpdatePositionModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionListItemStory } from "../../PositionListItem/__stories__";
import { withDeletePositionsProvider } from "../../DeletePositionsContext/__stories__";
import { MockedDeletePositionProvider } from "../../DeletePositionContext/__stories__";
import { MockedUpdatePositionProvider } from "../../UpdatePositionProvider/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/positions/PositionList",
  component: PositionList,
  decorators: [
    withDeletePositionsProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof PositionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedPositionSummaries.map((position) => (
      <UpdatePositionModalProvider key={position.id}>
        <MockedUpdatePositionProvider>
          <MockedDeletePositionProvider>
            <PositionListItem {...PositionListItemStory.args} {...position} />
          </MockedDeletePositionProvider>
        </MockedUpdatePositionProvider>
      </UpdatePositionModalProvider>
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
