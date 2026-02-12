import { useContext } from "react";
import { Button } from "../Button";
import { ToastContext } from "./ToastContext";
import { ToastColor, ToastRegion } from "./Toast";
import { CheckCircle2, CircleX } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

interface ToastStoryArgs {
  title: string;
  description?: string;
  timeout?: number;
  buttonLabel: string;
  color?: ToastColor;
}

const meta: Meta<ToastStoryArgs> = {
  title: "Components/ui/Toast",
  argTypes: {
    title: {
      control: "text",
    },
    timeout: {
      control: "number",
    },
    color: {
      control: "select",
      options: ["red", "green"],
    },
  },
  args: {
    color: "red",
  },
  decorators: [withThemedBackground],
};

export default meta;
type Story = StoryObj<ToastStoryArgs>;

const ToastTemplate = (props: ToastStoryArgs) => {
  const toastQueue = useContext(ToastContext);

  return (
    <>
      <ToastRegion />
      <Button
        onPress={() =>
          toastQueue.add(
            {
              title: "A server error occurred. ",
              iconLeft:
                props.color === "red" ? (
                  <CircleX size={16} strokeWidth={1.5} absoluteStrokeWidth />
                ) : (
                  <CheckCircle2
                    size={16}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                ),
              color: props.color,
            },
            props.timeout ? { timeout: props.timeout } : undefined,
          )
        }
        label="Show Toast"
      />
    </>
  );
};

export const Default = {
  render: (args) => {
    return <ToastTemplate {...args} />;
  },
} satisfies Story;
