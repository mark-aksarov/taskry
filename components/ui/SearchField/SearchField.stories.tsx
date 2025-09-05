import { SearchField } from "./SearchField";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Form } from "react-aria-components";
import { Button } from "../Button";
import { fn } from "storybook/test";

const meta: Meta<typeof SearchField> = {
  title: "Components/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder",
    errorMessage: "Error message",
    label: "Label",
    type: "text",
    className: "max-w-[400px]",
    isDisabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof SearchField>;

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
