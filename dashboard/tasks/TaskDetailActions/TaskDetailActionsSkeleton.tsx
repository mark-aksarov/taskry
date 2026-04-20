import { ButtonSkeleton } from "@/ui/Skeleton";

export function TaskDetailActionsSkeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      <ButtonSkeleton size="medium" ghost className="w-[8rem]" />
    </div>
  );
}
