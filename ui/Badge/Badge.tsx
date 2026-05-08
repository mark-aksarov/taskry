import { tv, type VariantProps } from "tailwind-variants";

export const badgeStyles = tv({
  base: "flex items-center justify-center gap-1 rounded-full px-5 py-1.5 text-center text-xs font-bold",
  variants: {
    color: {
      blue: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300",
      green:
        "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
      orange:
        "bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100",
      red: "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
      gray: "bg-gray-100 text-(--text-tertiary) dark:bg-gray-700",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export type BadgeColor = "blue" | "green" | "gray" | "orange" | "red";

export interface BadgeProps extends React.ComponentPropsWithRef<"div"> {
  color?: BadgeColor;
}

export const Badge = ({ color, children, className, ...props }: BadgeProps) => {
  return (
    <div
      role="presentation"
      className={badgeStyles({ color, className })}
      {...props}
    >
      {children}
    </div>
  );
};
