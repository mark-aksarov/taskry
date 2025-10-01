import { ViewToggle } from "@/components/common/ViewToggle";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import { ProjectFiltersBottomSheetTrigger } from "@/components/projects/ProjectFiltersBottomSheetTrigger";
import { ProjectFiltersSideSheetTrigger } from "@/components/projects/ProjectFiltersSideSheetTrigger";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default async function ProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between max-md:hidden">
        <div className="flex w-full gap-4">
          <ProjectFiltersSideSheetTrigger />
          <ProjectActionsMenuTrigger />
          <ViewToggle className="ml-auto" />
          <Button
            label="New Project"
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 md:hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Projects</h2>
          <div className="flex items-center gap-2">
            <ProjectFiltersBottomSheetTrigger />
            <ProjectActionsMenuTrigger />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ViewToggle />
          <Button
            label="New Project"
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        </div>
      </div>
    </div>
  );
}
