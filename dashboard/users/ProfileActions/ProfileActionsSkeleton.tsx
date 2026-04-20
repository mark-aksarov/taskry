import { ButtonSkeleton } from "@/ui/Skeleton";

export function ProfileActionsSkeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      <ButtonSkeleton size="medium" ghost className="w-[8rem]" />
      <ButtonSkeleton size="medium" ghost className="w-[12rem]" />
    </div>
  );
}
