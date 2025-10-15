import { Card } from "@/components/common/Card";

export function CommentItemCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex w-full flex-col gap-4 rounded-xl">{children}</Card>
  );
}
