import { Button } from "../Button";
import { fn } from "storybook/test";
import { SearchField } from "./SearchField";
import { Form } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof SearchField> = {
  title: "Components/ui/SearchField",
  component: SearchField,
  args: {
    placeholder: "Placeholder",
    errorMessage: "Error message",
    label: "Label",
    type: "text",
    className: "max-w-[400px]",
    isDisabled: false,
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
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
} satisfies Story;
