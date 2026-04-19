import { twMerge } from "tailwind-merge";
import { Card } from "../Card";

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
}

export function GridItem({ children, className }: GridItemProps) {
  return (
    <Card
      className={twMerge(
        "flex flex-col gap-4 max-md:rounded-lg md:rounded-md",
        className,
      )}
    >
      {children}
    </Card>
  );
}
