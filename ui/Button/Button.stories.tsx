import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { Button } from "./Button";
import { Clock, Download, Heart } from "lucide-react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { twMerge } from "tailwind-merge";

const iconOptions = ["None", "Clock", "Heart", "Download"];
const icons = {
  None: null,
  Clock: <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />,
  Heart: <Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />,
  Download: <Download size={16} strokeWidth={1.5} absoluteStrokeWidth />,
};

const meta = {
  title: "UI/Button",
  component: Button,
  argTypes: {
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
    onPress: fn(),
  },
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    label: "Button",
    variant: "accent",
  },
} satisfies Story;

const textClasses = "text-sm font-bold text-(--text-primary)";

export const Variant = {
  tags: ["!test"],
  render: (args) => {
    return (
      <table className="w-full max-w-[20rem] border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left">
            <th className="px-2"></th>
            <th className={textClasses}>default</th>
            <th className={textClasses}>disabled</th>
            <th className={textClasses}>outlined</th>
          </tr>
        </thead>

        <tbody>
          {/* Accent */}
          <tr className="bg-(--surface-secondary)">
            <td className={twMerge("px-2 py-2", textClasses)}>accent</td>
            <td className="py-2">
              <Button variant="accent" label="Button" {...args} />
            </td>
            <td className="py-2">
              <Button variant="accent" label="Button" isDisabled {...args} />
            </td>
            <td className="py-2"></td>
          </tr>

          {/* Primary */}
          <tr className="bg-(--surface-primary)">
            <td className={twMerge("px-2 py-2", textClasses)}>primary</td>
            <td className="py-2">
              <Button variant="primary" label="Button" {...args} />
            </td>
            <td className="py-2">
              <Button variant="primary" label="Button" isDisabled {...args} />
            </td>
            <td className="py-2">
              <Button variant="primary" label="Button" outlined {...args} />
            </td>
          </tr>

          {/* Secondary */}
          <tr className="bg-(--surface-secondary)">
            <td className={twMerge("px-2 py-2", textClasses)}>secondary</td>
            <td className="py-2">
              <Button variant="secondary" label="Button" {...args} />
            </td>
            <td className="py-2">
              <Button variant="secondary" label="Button" isDisabled {...args} />
            </td>
            <td className="py-2">
              <Button variant="secondary" label="Button" outlined {...args} />
            </td>
          </tr>

          {/* Secondary */}
          <tr className="bg-(--surface-secondary)">
            <td className={twMerge("px-2 py-2", textClasses)}>tertiary</td>
            <td className="py-2">
              <Button variant="tertiary" label="Button" {...args} />
            </td>
            <td className="py-2">
              <Button variant="tertiary" label="Button" isDisabled {...args} />
            </td>
            <td className="py-2"></td>
          </tr>

          {/* Contrast */}
          <tr>
            <td className={twMerge("px-2 py-2", textClasses)}>contrast</td>
            <td className="py-2">
              <Button variant="contrast" label="Button" {...args} />
            </td>
            <td className="py-2">
              <Button variant="contrast" label="Button" isDisabled {...args} />
            </td>
            <td className="py-2"></td>
          </tr>
        </tbody>
      </table>
    );
  },
} satisfies Story;

export const Size = {
  render: (args) => (
    <div className="flex items-start gap-4">
      <Button variant="accent" size="small" label="Small" {...args} />
      <Button variant="accent" size="medium" label="Medium" {...args} />
      <Button variant="accent" size="large" label="Large" {...args} />
    </div>
  ),
} satisfies Story;

export const Icon = {
  render: (args) => (
    <div className="flex items-start gap-4">
      <Button variant="accent" label="No icon" {...args} />
      <Button
        variant="accent"
        iconLeft={<Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        label="Icon left"
        {...args}
      />
      <Button
        variant="accent"
        iconRight={<Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        label="Icon right"
        {...args}
      />
      <Button
        variant="accent"
        iconRight={<Download size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        aria-label="Button"
        {...args}
      />
    </div>
  ),
} satisfies Story;

export const IsPending = {
  render: (args) => (
    <div className="flex items-start gap-4">
      <Button
        variant="accent"
        size="small"
        label="Small"
        isPending
        {...(args as any)}
      />
      <Button
        variant="accent"
        size="medium"
        label="Medium"
        isPending
        {...(args as any)}
      />
      <Button
        variant="accent"
        size="large"
        label="Large"
        isPending
        {...(args as any)}
      />
    </div>
  ),
} satisfies Story;
