import { twMerge } from "tailwind-merge";

interface SkeletonProps extends React.ComponentPropsWithRef<"div"> {
  className?: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={twMerge(
        "w-full animate-pulse rounded-full bg-gray-200 text-base dark:bg-gray-700",
        className,
      )}
      {...props}
    >
      &nbsp;
    </div>
  );
};
