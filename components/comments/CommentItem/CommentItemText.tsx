import { Skeleton } from "@/components/ui";

interface CommentItemTextProps {
  children: React.ReactNode;
}

export function CommentItemText({ children }: CommentItemTextProps) {
  return (
    <span className="ml-12 text-sm font-normal text-black dark:text-white">
      {children}
    </span>
  );
}

export function CommentItemTextSkeleton() {
  return (
    <div className="ml-12 flex flex-col">
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
    </div>
  );
}
