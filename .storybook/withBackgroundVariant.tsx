import React, { useEffect } from "react";
import { type Decorator } from "@storybook/react";

type BackgroundVariant = "default" | "alt";

interface WithBackgroundVariantOptions {
  variant?: BackgroundVariant;
}

export const withBackgroundVariant = (
  options: WithBackgroundVariantOptions = {},
): Decorator => {
  const { variant: defaultVariant = "default" } = options;

  return (Story, context) => {
    const variant: BackgroundVariant =
      context.parameters.variant || defaultVariant;

    const theme = context.globals.theme || "light";
    const bgClass =
      variant === "default"
        ? theme === "light"
          ? "bg-gray-100"
          : "bg-gray-900"
        : theme === "light"
          ? "bg-white"
          : "bg-gray-800";

    useEffect(() => {
      document.body.classList.add(bgClass);

      return () => {
        document.body.classList.remove(bgClass);
      };
    }, [bgClass]);

    return (
      <div className={bgClass}>
        <Story />
      </div>
    );
  };
};
