import { Button } from "@/components/ui/Button";
import { NewPositionForm } from "../NewPositionForm";
import { NewPositionModal } from "./NewPositionModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/positions/NewPositionModal",
  component: NewPositionModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New Position" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewPositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newPositionForm: (
      <NewPositionForm createPosition={() => ({ status: "success" })} />
    ),
  },
} satisfies Story;
