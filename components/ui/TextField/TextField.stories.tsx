import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TextField } from "../TextField";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/Button";
import { fn } from "storybook/test";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/ui/TextField",
  component: TextField,
  argTypes: {
    type: {
      options: ["text", "password"],
      control: { type: "radio" },
    },
  },

  args: {
    placeholder: "Placeholder",
    multiline: false,
    errorMessage: "Error message",
    label: "Label",
    type: "text",
    isDisabled: false,
    onChange: fn(),
  },

  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Invalid = {
  args: {
    isInvalid: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    isDisabled: true,
  },
} satisfies Story;

export const Multiline = {
  args: {
    multiline: true,
  },
} satisfies Story;

export const Validation = {
  args: {
    isRequired: true,
    className: "w-full",
    name: "text-field",
  },
  decorators: [
    (Story) => (
      <Form className="flex flex-col items-start gap-4">
        <Story />
        <Button
          type="submit"
          label="Submit"
          className="w-full justify-center"
        />
      </Form>
    ),
  ],
} satisfies Story;
