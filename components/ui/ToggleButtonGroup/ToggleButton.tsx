import { focusRing } from "../styles";
import { tv } from "tailwind-variants";
import { baseButton } from "../Button";
import type { ToggleButtonProps } from "react-aria-components";
import {
  composeRenderProps,
  ToggleButton as RACToggleButton,
} from "react-aria-components";

const toggleButtonStyles = tv({
  extend: focusRing,
  base: [baseButton.base, "px-3 py-2 text-xs"],
  variants: {
    isSelected: {
      false: "bg-white text-black dark:bg-gray-800 dark:text-white",
      true: "bg-black text-white dark:bg-white dark:text-black",
    },
    isDisabled: {
      true: "pointer-events-none bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500",
    },
  },
});

export const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        toggleButtonStyles({ ...renderProps, className }),
      )}
    />
  );
};
