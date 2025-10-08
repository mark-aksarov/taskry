import {
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  Skeleton,
} from "@/components/ui";

export function GridItemActionMenuSkeleton() {
  return (
    <div className="-mr-2 ml-auto flex h-8 w-8 items-center justify-center">
      <Skeleton className="h-1 w-4" />
    </div>
  );
}

export function GridItemActionMenuDialogHeader() {
  return (
    <DialogHeader className="px-4 py-3">
      <DialogHeading className="text-base">Actions</DialogHeading>
      <DialogCloseButton />
    </DialogHeader>
  );
}

export const gridItemActionMenuItemStyles = "flex items-center gap-4 font-bold";
