import { Select } from "../Select";
import { Item } from "react-stately";
import { fn } from "storybook/test";
import { Apple, Banana, Citrus } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Form } from "react-aria-components";
import { Button } from "../Button";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Label",
    description: "Description",
    placeholder: "Select an option",
    errorMessage: "Error message",
    className: "max-w-[400px]",
    overlayClassName: "w-[var(--trigger-width)]",
    onSelectionChange: fn(),
    isDisabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectTemplate: Story = {
  args: {
    optionClassName: "font-semibold",
  },
  render: (args) => {
    const itemClasses = "flex items-center gap-4";

    return (
      <Select {...args}>
        <Item textValue="Apple" key="apple">
          <div className={itemClasses}>
            <Apple size={16} /> Apple
          </div>
        </Item>
        <Item textValue="Banana" key="banana">
          <div className={itemClasses}>
            <Banana size={16} /> Banana
          </div>
        </Item>
        <Item textValue="Orange" key="orange">
          <div className={itemClasses}>
            <Citrus size={16} />
            Orange
          </div>
        </Item>
      </Select>
    );
  },
};

export const Default: Story = {
  ...SelectTemplate,
};

export const Invalid: Story = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    isInvalid: true,
  },
};

export const Disabled: Story = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    isDisabled: true,
  },
};

export const Validation: Story = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
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
