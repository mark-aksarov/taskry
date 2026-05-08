import { twMerge } from "tailwind-merge";

export const AppSidebar = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={twMerge("w-[260px] bg-(--surface-primary)", className)}>
      {children}
    </div>
  );
};
