import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ViewToggle } from "@/components/common/ViewToggle";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "@/components/projects/ProjectFiltersForm";
import { ProjectFiltersSideSheetTrigger } from "@/components/projects/ProjectFiltersSideSheetTrigger";
import { ProjectFiltersBottomSheetTrigger } from "@/components/projects/ProjectFiltersBottomSheetTrigger";
import { getProjectCategories } from "@/lib/queries/project";
import { ProjectCategoryCheckboxGroup } from "@/components/projects/ProjectCategoryCheckboxGroup";
import { getCustomers } from "@/lib/queries/customers";
import { CustomerCheckboxGroup } from "@/components/customer/CustomerCheckboxGroup";
import { getUsers } from "@/lib/queries/user";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { Card, CardHeading } from "@/components/common/Card";
import { ListSkeleton } from "@/components/common/ListSkeleton";
import { PaginationSkeleton } from "@/components/common/Pagination";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectItem } from "@/components/projects/ProjectItem";
import { ProjectGrid } from "@/components/projects/ProjectGrid/ProjectGrid";

export default async function ProjectsPage() {
  const categoriesPromise = getProjectCategories(1);
  const customersPromise = getCustomers(1);
  const usersPromise = getUsers(1);

  const projectFiltersForm = (
    <ProjectFiltersForm
      projectCategoryCheckboxGroup={
        <ProjectCategoryCheckboxGroup categoriesPromise={categoriesPromise} />
      }
      customerCheckboxGroup={
        <CustomerCheckboxGroup customersPromise={customersPromise} />
      }
      userCheckboxGroup={<UserCheckboxGroup usersPromise={usersPromise} />}
    />
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex items-center justify-between max-md:hidden">
          <div className="flex w-full gap-4">
            <ProjectFiltersSideSheetTrigger
              projectFiltersForm={
                <Suspense fallback={<ProjectFiltersFormSkeleton />}>
                  {projectFiltersForm}
                </Suspense>
              }
            />
            <ProjectActionsMenuTrigger />
            <ViewToggle className="ml-auto" />
            <Button
              label="New Project"
              iconLeft={
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 md:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">Projects</h2>
            <div className="flex items-center gap-2">
              <ProjectFiltersBottomSheetTrigger
                projectFiltersForm={
                  <Suspense fallback={<ProjectFiltersFormSkeleton />}>
                    {projectFiltersForm}
                  </Suspense>
                }
              />
              <ProjectActionsMenuTrigger />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ViewToggle />
            <Button
              label="New Project"
              iconLeft={
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
            />
          </div>
        </div>
      </div>

      <Card className="hidden">
        <div className="flex flex-col gap-4">
          <CardHeading>Projects</CardHeading>
          <Suspense
            fallback={
              <>
                <ListSkeleton items={10} renderItem={() => <ProjectItem />} />
                <PaginationSkeleton />
              </>
            }
          >
            <ProjectList />
          </Suspense>
        </div>
      </Card>

      <Suspense
        fallback={
          <>
            <ListSkeleton items={10} renderItem={() => <ProjectItem />} />
            <PaginationSkeleton />
          </>
        }
      >
        <ProjectGrid />
      </Suspense>
    </div>
  );
}
