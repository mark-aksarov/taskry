import { twMerge } from "tailwind-merge";
import { Card } from "../Card";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function ListItem({ className, children, ...props }: ListItemProps) {
  return (
    <Card
      className={twMerge("@container rounded-md py-3 pr-2", className)}
      {...props}
    >
      {children}
    </Card>
  );
}
