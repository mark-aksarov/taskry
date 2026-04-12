import { FieldSkeleton, FieldGroupSkeleton } from "@/components/ui/Skeleton";

export function UpdateCustomerCompanyFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <FieldSkeleton>
        <FieldGroupSkeleton />
      </FieldSkeleton>
    </div>
  );
}
