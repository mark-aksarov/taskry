import { twMerge } from "tailwind-merge";
import { Card } from "@/components/common/Card";

interface DetailCardProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailCard({ className, children }: DetailCardProps) {
  return (
    <Card
      data-test="user-card"
      className={twMerge(
        "m-auto flex max-h-full min-h-[500px] p-0 max-2xl:w-full max-md:hidden 2xl:w-[1024px]",
        className,
      )}
    >
      {children}
    </Card>
  );
}
