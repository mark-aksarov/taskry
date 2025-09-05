import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { Button } from "./Button";
import { Clock, Download, Heart } from "lucide-react";

const iconOptions = ["None", "Clock", "Heart", "Download"];
const icons = {
  None: null,
  Clock: <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />,
  Heart: <Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />,
  Download: <Download size={16} strokeWidth={1.5} absoluteStrokeWidth />,
};

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: {
        type: "select",
      },
      options: ["button", "a"],
    },
    className: {
      control: {
        type: "text",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    iconLeft: {
      control: {
        type: "select",
      },
      options: iconOptions,
      mapping: icons,
    },
    iconRight: {
      control: {
        type: "select",
      },
      options: iconOptions,
      mapping: icons,
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
  },
} satisfies Story;

export const Variant = {
  tags: ["!test"],
  render: (args) => {
    const textClasses = "text-sm font-semibold";

    return (
      <div className="grid max-w-[20rem] grid-cols-3 justify-center gap-4">
        <div></div>
        <div className={textClasses}>default</div>
        <div className={textClasses}>disabled</div>

        <div className={textClasses}>primary</div>
        <div>
          <Button variant="primary" label="Button" {...args} />
        </div>
        <div>
          <Button variant="primary" label="Button" isDisabled {...args} />
        </div>

        <div className={textClasses}>secondary</div>
        <div>
          <Button variant="secondary" label="Button" {...args} />
        </div>
        <div>
          <Button variant="secondary" label="Button" isDisabled {...args} />
        </div>

        <div className={textClasses}>ghost</div>
        <div>
          <Button variant="ghost" label="Button" {...args} />
        </div>
        <div>
          <Button variant="ghost" label="Button" isDisabled {...args} />
        </div>

        <div className={textClasses}>outlined</div>
        <div>
          <Button variant="outlined" label="Button" {...args} />
        </div>
        <div>
          <Button variant="outlined" label="Button" isDisabled {...args} />
        </div>

        <div className={textClasses}>contrast</div>
        <div>
          <Button variant="contrast" label="Button" {...args} />
        </div>
        <div>
          <Button variant="contrast" label="Button" isDisabled {...args} />
        </div>
      </div>
    );
  },
} satisfies Story;

export const Size = {
  render: (args) => (
    <div className="flex items-start gap-4">
      <Button size="small" label="Small" {...args} />
      <Button size="medium" label="Medium" {...args} />
      <Button size="large" label="Large" {...args} />
    </div>
  ),
} satisfies Story;

export const Icon = {
  render: (args) => (
    <div className="flex items-start gap-4">
      <Button label="No icon" {...args} />
      <Button
        iconLeft={<Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        label="Icon left"
        {...args}
      />
      <Button
        iconRight={<Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        label="Icon right"
        {...args}
      />
      <Button
        iconRight={<Download size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        aria-label="Button"
        {...args}
      />
    </div>
  ),
} satisfies Story;
