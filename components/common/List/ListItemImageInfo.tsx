import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui";
import { ImageContainerSkeleton } from "../ImageContainer";

interface ListItemImageInfoProps {
  className?: string;
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
}

const styles = "flex-1 items-center overflow-hidden flex gap-3 -m-1 p-1";

export function ListItemImageInfo({
  className,
  children,
}: ListItemImageInfoProps) {
  return (
    <div className={twMerge(styles, className)}>
      {children[0]}
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        {children[1]}
        {children[2]}
      </div>
    </div>
  );
}

export function ListItemImageInfoSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={twMerge(styles, className)}>
      <ImageContainerSkeleton className="h-9 w-9" />
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        <Skeleton className="w-[10rem] max-w-full" size="sm" />
        <Skeleton className="w-[7rem] max-w-full" size="xs" />
      </div>
    </div>
  );
}
