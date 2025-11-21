import { Skeleton } from "@/components/ui";
import { DetailFormFieldSkeleton } from "@/components/common/DetailForm";

export function ProjectDetailFormSkeleton() {
  return (
    <div className="flex w-[350px] flex-col gap-4">
      <DetailFormFieldSkeleton />
      <DetailFormFieldSkeleton />
      <DetailFormFieldSkeleton />
      <DetailFormFieldSkeleton />

      <div className="flex gap-3">
        <Skeleton className="h-10 flex-auto rounded-lg" />
        <Skeleton className="h-10 flex-auto rounded-lg" />
      </div>
    </div>
  );
}
