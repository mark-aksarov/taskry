import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TextField } from "../TextField";
import { Form } from "react-aria-components";
import { Button } from "@/components/ui/Button";
import { fn } from "storybook/test";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/ui/TextField",
  component: TextField,
  tags: ["autodocs"],
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
    className: "max-w-[400px]",
    isDisabled: false,
    onChange: fn(),
  },

  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Multiline: Story = {
  args: {
    multiline: true,
  },
};

export const Validation: Story = {
  args: {
    isRequired: true,
    className: "w-full",
    name: "text-field",
  },
  decorators: [
    (Story) => (
      <Form className="flex max-w-[400px] flex-col items-start gap-4">
        <Story />
        <Button
          type="submit"
          label="Submit"
          className="w-full justify-center"
        />
      </Form>
    ),
  ],
};
