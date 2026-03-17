import { ButtonSkeleton } from "@/components/ui/Skeleton";

export function ProjectDetailActionsSkeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      <ButtonSkeleton size="medium" ghost className="w-[8rem]" />
      <ButtonSkeleton size="medium" ghost className="w-[10rem]" />
      <ButtonSkeleton size="medium" ghost className="w-[12rem]" />
    </div>
  );
}
