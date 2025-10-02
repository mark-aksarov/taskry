import { Form } from "react-aria-components";
import { TextField } from "@/components/ui/TextField";
import { ProjectCategoryFilter } from "../ProjectCategoryFilter";
import { ProjectStatusFilter } from "../ProjectStatusFilter";
import { CustomerFilter } from "@/components/customer/CustomerFilter";
import { UserFilter } from "@/components/users/UserFilter";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectDeadline } from "../ProjectDeadline";
import { CheckboxGroupSkeleton } from "@/components/common/CheckboxGroupSkeleton";

export function ProjectFilters() {
  return (
    <Form className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <TextField label="Title" placeholder="Title" />
        <ProjectStatusFilter />
        <ProjectCategoryFilter />
        <CustomerFilter />
        <UserFilter />
        <ProjectDeadline />
      </div>
      <Button
        variant="primary"
        size="medium"
        label="Apply Filters"
        className="justify-center"
      />
    </Form>
  );
}

export function ProjectFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <FieldSkeleton />
        <CheckboxGroupSkeleton />
        <CheckboxGroupSkeleton />
        <CheckboxGroupSkeleton />
        <CheckboxGroupSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <Skeleton className="h-[2.625rem] w-full rounded-lg" />
    </div>
  );
}
