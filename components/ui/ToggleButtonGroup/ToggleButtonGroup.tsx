import {
  ToggleButtonGroup as RACToggleButtonGroup,
  ToggleButtonGroupProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const styles = tv({
  base: "inline-flex rounded-lg",
  variants: {
    isDisabled: {
      false: "bg-white dark:bg-gray-800",
      true: "bg-gray-100 dark:bg-gray-800",
    },
  },
});

export const ToggleButtonGroup = (props: ToggleButtonGroupProps) => {
  return <RACToggleButtonGroup {...props} className={styles} />;
};
