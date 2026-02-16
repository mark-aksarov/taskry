import { PositionList } from "../PositionList";
import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "../../PositionListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionListItemStory } from "../../PositionListItem/__stories__";
import { withDeletePositionModalProvider } from "../../DeletePositionModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const mockedPositions = [
  { id: 1, name: "Position 1" },
  { id: 2, name: "Position 2" },
  { id: 3, name: "Position 3" },
  { id: 4, name: "Position 4" },
  { id: 5, name: "Position 5" },
];

const meta = {
  title: "components/positions/PositionList",
  component: PositionList,
  decorators: [
    withSelectedItemsProvider,
    withDeletePositionModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof PositionList>;

export default meta;
type Story = StoryObj<typeof PositionList>;

export const Default = {
  args: {
    children: mockedPositions.map((position) => (
      <PositionListItem
        {...PositionListItemStory.args}
        key={position.id}
        {...position}
      />
    )),
  },
} satisfies Story;
