import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditPositionForm } from "../EditPositionForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/positions/EditPositionForm",
  component: EditPositionForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditPositionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    nameDefaultValue: "Project Manager",
    updatePosition: () => ({ status: "success" }),
  },
} satisfies Story;
