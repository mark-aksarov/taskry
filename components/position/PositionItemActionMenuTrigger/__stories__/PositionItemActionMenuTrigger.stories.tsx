import { Meta, StoryObj } from "@storybook/react";
import { EditPositionForm } from "../../EditPositionForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditPositionFormStory } from "../../EditPositionForm/__stories__";
import { PositionItemActionMenuTrigger } from "../PositionItemActionMenuTrigger";
import { withDeletePositionModalProvider } from "../../DeletePositionModal/__stories__";

const meta = {
  title: "components/positions/PositionItemActionMenuTrigger",
  component: PositionItemActionMenuTrigger,
  decorators: [withDeletePositionModalProvider, withThemedBackground],
} satisfies Meta<typeof PositionItemActionMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    positionId: 1,
    positionName: "Project Manager",
    editPositionForm: <EditPositionForm {...EditPositionFormStory.args} />,
  },
} satisfies Story;
