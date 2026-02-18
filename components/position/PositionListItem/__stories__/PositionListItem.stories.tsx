import { Meta, StoryObj } from "@storybook/react";
import { PositionListItem } from "../PositionListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PositionItemActionMenuTrigger } from "../../PositionItemActionMenuTrigger";
import { withDeletePositionModalProvider } from "../../DeletePositionModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { PositionItemActionMenuTriggerStory } from "../../PositionItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/positions/PositionListItem",
  component: PositionListItem,
  decorators: [
    withSelectedItemsProvider,
    withDeletePositionModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof PositionListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

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
