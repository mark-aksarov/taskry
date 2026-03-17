import { Card } from "../Card";

export function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-4 max-md:rounded-lg md:rounded-md">
      {children}
    </Card>
  );
}
