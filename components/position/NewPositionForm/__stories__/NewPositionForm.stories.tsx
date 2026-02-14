import { NewPositionForm } from "../NewPositionForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/positions/NewPositionForm",
  component: NewPositionForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewPositionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createPosition: () => ({ status: "success" }),
  },
} satisfies Story;
