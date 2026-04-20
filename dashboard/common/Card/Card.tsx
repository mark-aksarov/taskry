import { tv } from "tailwind-variants";

export const Card = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  return (
    <div className={cardStyles({ className })} {...props}>
      {children}
    </div>
  );
};

export const cardStyles = tv({
  base: "overflow-hidden rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] dark:bg-gray-800 dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]",
});
