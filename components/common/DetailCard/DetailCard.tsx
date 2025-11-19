import { twMerge } from "tailwind-merge";
import { Card } from "../Card";

interface DetailCardProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailCard({ className, children }: DetailCardProps) {
  return (
    <Card
      className={twMerge(
        "flex flex-col p-0 max-lg:w-full lg:w-[800px]",
        className,
      )}
    >
      {children}
    </Card>
  );
}
