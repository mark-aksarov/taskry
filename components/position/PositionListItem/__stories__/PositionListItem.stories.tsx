import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "../PositionListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionItemActionMenuTrigger } from "../../PositionItemActionMenuTrigger";
import { PositionItemActionMenuTriggerStory } from "../../PositionItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/positions/PositionListItem",
  component: PositionListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof PositionListItem>;

export default meta;
type Story = StoryObj<typeof PositionListItem>;

export const Default = {
  args: {
    id: 1,
    name: "Project Manager",
    menuTrigger: (
      <PositionItemActionMenuTrigger
        {...PositionItemActionMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;
