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
        "flex flex-col p-0 max-2xl:w-full 2xl:w-[1024px]",
        className,
      )}
    >
      {children}
    </Card>
  );
}
