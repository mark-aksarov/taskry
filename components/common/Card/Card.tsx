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
  base: "overflow-hidden rounded-2xl bg-white p-4 max-md:shadow-lg/5 md:shadow-lg dark:bg-gray-800",
});
