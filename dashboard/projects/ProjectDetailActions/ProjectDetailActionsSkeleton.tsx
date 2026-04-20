import { ButtonSkeleton } from "@/ui/Skeleton";

export function ProjectDetailActionsSkeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      <ButtonSkeleton size="medium" ghost className="w-[8rem]" />
    </div>
  );
}
