import { Skeleton } from "@/components/ui/Skeleton";

export const NavigationButtonSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <Skeleton size="sm" className={className} />
    </div>
  );
};
