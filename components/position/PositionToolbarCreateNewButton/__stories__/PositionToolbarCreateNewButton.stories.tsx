import { Meta, StoryObj } from "@storybook/react";
import { NewPositionForm } from "../../NewPositionForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionToolbarCreateNewButton } from "../PositionToolbarCreateNewButton";
import { Default as NewPositionFormStory } from "../../NewPositionForm/NewPositionForm.stories";

const meta = {
  title: "components/positions/PositionToolbarCreateNewButton",
  component: PositionToolbarCreateNewButton,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof PositionToolbarCreateNewButton>;

export default meta;
type Story = StoryObj<typeof PositionToolbarCreateNewButton>;

export const Default = {
  args: {
    guestMode: false,
    newPositionForm: <NewPositionForm {...NewPositionFormStory.args} />,
  },
} satisfies Story;
