import {
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  Skeleton,
} from "@/components/ui";

export function CommentItemActionMenuSkeleton() {
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      <Skeleton className="h-1 w-4" />
    </div>
  );
}

export function CommentItemActionMenuDialogHeader() {
  return (
    <DialogHeader className="px-4 py-3">
      <DialogHeading className="text-base">Actions</DialogHeading>
      <DialogCloseButton />
    </DialogHeader>
  );
}

export const commentItemActionMenuItemStyles =
  "flex items-center gap-4 font-bold";
