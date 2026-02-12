import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "./PositionListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionItemActionMenuTrigger } from "../PositionItemActionMenuTrigger";

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
        guestMode={false}
        positionId={1}
        positionName="Project Manager"
      />
    ),
  },
} satisfies Story;
