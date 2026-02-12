import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditUserFormSkeleton } from "./EditUserFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/EditUserFormSkeleton",
  component: EditUserFormSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} as Meta<typeof EditUserFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
