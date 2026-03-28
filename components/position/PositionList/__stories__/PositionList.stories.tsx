import { PositionList } from "../PositionList";
import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "../../PositionListItem";
import { mockedPositionSummaries } from "@/mocks/positions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionListItemStory } from "../../PositionListItem/__stories__";
import { MockedUpdatePositionProvider } from "../../UpdatePositionProvider/__stories__";
import { MockedDeletePositionProvider } from "../../DeletePositionProvider/__stories__";
import { withDeletePositionsProvider } from "../../DeletePositionsProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/positions/PositionList",
  component: PositionList,
  decorators: [
    withDeletePositionsProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof PositionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedPositionSummaries.map((position) => (
      <MockedUpdatePositionProvider key={position.id}>
        <MockedDeletePositionProvider>
          <PositionListItem
            key={position.id}
            {...PositionListItemStory.args}
            {...position}
          />
        </MockedDeletePositionProvider>
      </MockedUpdatePositionProvider>
    )),
  },
} satisfies Story;
