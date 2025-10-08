import { Card } from "../Card";

export function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <Card className="@container flex w-full items-center gap-4 rounded-md py-3">
      {children}
    </Card>
  );
}
