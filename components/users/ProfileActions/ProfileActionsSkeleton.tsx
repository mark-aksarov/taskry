import { NavigationButtonSkeleton } from "@/components/common/NavigationButton";

export function ProfileActionsSkeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      <NavigationButtonSkeleton className="w-[8rem]" />
      <NavigationButtonSkeleton className="w-[12rem]" />
    </div>
  );
}
