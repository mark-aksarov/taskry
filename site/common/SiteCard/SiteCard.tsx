import { Card } from "@/site/common/Card";
import { twMerge } from "tailwind-merge";

interface SiteCardProps {
  className?: string;
  children: React.ReactNode;
}

export function SiteCard({ className, children }: SiteCardProps) {
  return (
    <Card
      className={twMerge(
        "group flex flex-col items-start gap-6 transition-all hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </Card>
  );
}
