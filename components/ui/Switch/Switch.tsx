import { tv } from "tailwind-variants";
import { focusRing } from "../styles";
import {
  composeRenderProps,
  Switch as RACSwitch,
  type SwitchProps as RACSwitchProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

type SwitchProps = Omit<RACSwitchProps, "children"> &
  React.RefAttributes<HTMLLabelElement> & {
    children: React.ReactNode;
  };

const track = tv({
  extend: focusRing,
  base: "flex h-[1.25rem] w-[2.25rem] shrink-0 cursor-default items-center rounded-full px-[3px] transition duration-200 ease-in-out",
  variants: {
    isSelected: {
      false: "bg-gray-300 dark:bg-gray-500",
      true: "bg-blue-600 dark:bg-blue-700",
    },
    isDisabled: {
      true: "bg-gray-200 dark:bg-gray-700",
    },
  },
});

const handle = tv({
  base: "h-[0.875rem] w-[0.875rem] transform rounded-full bg-white transition duration-200 ease-in-out",
  variants: {
    isSelected: {
      false: "translate-x-0",
      true: "translate-x-[1rem]",
    },
    isDisabled: {
      true: "bg-gray-100 dark:bg-gray-600",
    },
  },
});

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <RACSwitch
      {...props}
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          "flex items-center gap-2 text-xs font-bold text-black transition disabled:text-gray-400 dark:text-white dark:disabled:text-gray-500",
          className,
        ),
      )}
    >
      {(renderProps) => (
        <>
          {children}
          <div className={track(renderProps)}>
            <span className={handle(renderProps)} />
          </div>
        </>
      )}
    </RACSwitch>
  );
}
