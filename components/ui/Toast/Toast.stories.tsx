import { useContext } from "react";
import { Button } from "../Button";
import { ToastRegion } from "./Toast";
import { CircleX } from "lucide-react";
import { ToastContext } from "./ToastContext";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

interface ToastStoryArgs {
  title: string;
  description?: string;
  timeout?: number;
  buttonLabel: string;
}

const meta: Meta<ToastStoryArgs> = {
  title: "Components/ui/Toast",
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    timeout: {
      control: "number",
    },
  },
  decorators: [withThemedBackground],
};

export default meta;
type Story = StoryObj<ToastStoryArgs>;

export const Default: Story = {
  render: (args) => {
    const toastQueue = useContext(ToastContext);

    return (
      <>
        <ToastRegion />
        <Button
          onPress={() =>
            toastQueue.add(
              {
                title: "Something went wrong. Delete failed.",
                iconLeft: (
                  <CircleX size={16} strokeWidth={1.5} absoluteStrokeWidth />
                ),
              },
              args.timeout ? { timeout: args.timeout } : undefined,
            )
          }
          label="Show Toast"
        />
      </>
    );
  },
};
