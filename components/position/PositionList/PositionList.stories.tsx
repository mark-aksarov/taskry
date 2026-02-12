import { PositionList } from "./PositionList";
import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "../PositionListItem";
import { PositionListItemStory } from "../PositionListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionItemActionMenuTrigger } from "../PositionItemActionMenuTrigger";
import { PositionItemActionMenuTriggerStory } from "../PositionItemActionMenuTrigger/__stories__";

const mockedPositions = [
  { id: 1, name: "Project Manager" },
  { id: 2, name: "Frontend Developer" },
  { id: 3, name: "Backend Developer" },
  { id: 4, name: "UI/UX Designer" },
  { id: 5, name: "QA Engineer" },
];

const meta = {
  title: "components/positions/PositionList",
  component: PositionList,
  decorators: [withThemedBackground],
} satisfies Meta<typeof PositionList>;

export default meta;
type Story = StoryObj<typeof PositionList>;

export const Default = {
  args: {
    children: mockedPositions.map((position) => (
      <PositionListItem
        {...PositionListItemStory.args}
        key={position.id}
        id={position.id}
        name={position.name}
        menuTrigger={
          <PositionItemActionMenuTrigger
            {...PositionItemActionMenuTriggerStory.args}
            positionId={position.id}
            positionName={position.name}
          />
        }
      />
    )),
  },
} satisfies Story;
