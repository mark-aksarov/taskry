import { twMerge } from "tailwind-merge";
import { Card } from "../Card";

interface ListItemProps {
  className?: string;
  children: React.ReactNode;
}

export function ListItem({ className, children }: ListItemProps) {
  return (
    <Card
      className={twMerge(
        "@container flex w-full items-center gap-4 rounded-md py-3 pr-2",
        className,
      )}
    >
      {children}
    </Card>
  );
}
