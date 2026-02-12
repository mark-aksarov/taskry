import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditPositionForm } from "../EditPositionForm";
import { EditPositionModal } from "./EditPositionModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditPositionFormStory } from "../EditPositionForm/__stories__";

const meta = {
  title: "components/positions/EditPositionModal",
  component: EditPositionModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Edit position" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditPositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editPositionForm: <EditPositionForm {...EditPositionFormStory.args} />,
  },
} satisfies Story;
