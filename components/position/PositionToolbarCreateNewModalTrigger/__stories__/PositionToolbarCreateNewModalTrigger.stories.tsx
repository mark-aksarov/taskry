import { Meta, StoryObj } from "@storybook/react";
import { NewPositionForm } from "../../NewPositionForm";
import { NewPositionFormStory } from "../../NewPositionForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionToolbarCreateNewModalTrigger } from "../PositionToolbarCreateNewModalTrigger";

const meta = {
  title: "components/positions/PositionToolbarCreateNewModalTrigger",
  component: PositionToolbarCreateNewModalTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof PositionToolbarCreateNewModalTrigger>;

export default meta;
type Story = StoryObj<typeof PositionToolbarCreateNewModalTrigger>;

export const Default = {
  args: {
    guestMode: false,
    newPositionForm: <NewPositionForm {...NewPositionFormStory.args} />,
  },
} satisfies Story;
