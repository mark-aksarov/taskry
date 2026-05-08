import { twMerge } from "tailwind-merge";

export type SkeletonSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

interface SkeletonProps extends React.ComponentPropsWithRef<"div"> {
  size?: SkeletonSize;
  className?: string;
}

export const Skeleton = ({ className, size, ...props }: SkeletonProps) => {
  return (
    <div
      className={twMerge(
        "w-full animate-pulse rounded-full bg-(--surface-tertiary) text-base",
        size === "xs" && "my-[0.125rem] h-[0.75rem]",
        size === "sm" && "my-[0.25rem] h-[0.875rem]",
        size === "base" && "my-[0.25rem] h-[1rem]",
        size === "lg" && "my-[0.15625rem] h-[1.125rem]",
        size === "xl" && "my-[0.1875rem] h-[1.25rem]",
        size === "2xl" && "my-[0.25rem] h-[1.5rem]",
        size === "3xl" && "my-[0.25rem] h-[1.75rem]",
        size === "4xl" && "my-[0.3125rem] h-[2.125rem]",
        size === "5xl" && "my-[0.4375rem] h-[2.625rem]",
        className,
      )}
      {...props}
    >
      &nbsp;
    </div>
  );
};
