import { Select } from "../Select";
import { Item } from "react-stately";
import { fn } from "storybook/test";
import { Apple, Banana, Citrus } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Form } from "react-aria-components";
import { Button } from "../Button";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  args: {
    label: "Label",
    description: "Description",
    placeholder: "Select an option",
    errorMessage: "Error message",
    overlayClassName: "w-[var(--trigger-width)]",
    onSelectionChange: fn(),
    isDisabled: false,
  },
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectTemplate: Story = {
  render: (args) => {
    return (
      <Select {...args}>
        <Item textValue="Apple" key="apple">
          <Apple size={16} /> Apple
        </Item>
        <Item textValue="Banana" key="banana">
          <Banana size={16} /> Banana
        </Item>
        <Item textValue="Orange" key="orange">
          <Citrus size={16} />
          Orange
        </Item>
      </Select>
    );
  },
};

export const Default = {
  ...SelectTemplate,
} satisfies Story;

export const WithSheet = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    overlayType: "bottomsheet",
    overlayClassName: "",
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Story;

export const Invalid = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    isInvalid: true,
  },
} satisfies Story;

export const Disabled = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    isDisabled: true,
  },
} satisfies Story;

export const Validation = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
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
