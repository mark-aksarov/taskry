import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewUserFormSkeleton } from "./NewUserFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/NewUserFormSkeleton",
  component: NewUserFormSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} as Meta<typeof NewUserFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
