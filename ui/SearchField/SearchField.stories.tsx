import { Button } from "../Button";
import { fn } from "storybook/test";
import { SearchField } from "./SearchField";
import { Form } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof SearchField> = {
  title: "UI/SearchField",
  component: SearchField,
  args: {
    placeholder: "Placeholder",
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
} satisfies Meta<typeof SearchField>;

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
          variant="accent"
          className="w-full justify-center"
        />
      </Form>
    ),
  ],
} satisfies Story;
