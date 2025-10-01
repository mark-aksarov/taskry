import { Form } from "react-aria-components";
import { TextField } from "@/components/ui/TextField";
import { ProjectCategorySelect } from "../ProjectCategorySelect";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { CustomerSelect } from "@/components/customer/CustomerSelect";
import { UserSelect } from "@/components/users/UserSelect";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectDeadline } from "../ProjectDeadline";

export function ProjectFilters() {
  return (
    <Form className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <TextField label="Title" placeholder="Title" />
        <ProjectStatusSelect />
        <ProjectCategorySelect />
        <CustomerSelect />
        <UserSelect />
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
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <Skeleton className="h-[2.625rem] w-full rounded-lg" />
    </div>
  );
}
